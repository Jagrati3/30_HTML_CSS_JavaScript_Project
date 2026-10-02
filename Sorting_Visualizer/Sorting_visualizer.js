
    {/* // -------- State & utils -------- */}
    let arr = [];
    let isSorting = false;
    let delayMs = 40;
    let maxBarHeight = 360;
    let comparisons = 0;
    let writes = 0;

    const qs = (s) => document.querySelector(s);
    const arrayContainer = qs('#array-container');
    const comparisonsEl = qs('#comparisons');
    const writesEl = qs('#writes');
    const statusSizeEl = qs('#statusSize');
    const statusTextEl = qs('#statusText');
    const testLog = qs('#testLog');

    function resetCounters(){ comparisons = 0; writes = 0; updateStatus(); }
    function updateStatus(text){
      if (typeof text === 'string') statusTextEl.textContent = text;
      comparisonsEl.textContent = comparisons;
      writesEl.textContent = writes;
      statusSizeEl.textContent = arr.length;
    }
    const sleep = (ms) => new Promise(res => setTimeout(res, ms));
    function randomArray(n, maxH){
      const out = new Array(n);
      for (let i=0;i<n;i++) out[i] = 10 + Math.floor(Math.random()*Math.max(20,maxH-10));
      return out;
    }
    function computeBarWidth(n){
      const padding = 16, marginPerBar = 4;
      const cw = arrayContainer.clientWidth || 1000;
      const usable = Math.max(60, cw - padding);
      return Math.max(2, Math.floor((usable - n*marginPerBar) / Math.max(1,n)));
    }
    function renderArray({highlightA=-1, highlightB=-1, sortedUntil=-1} = {}){
      arrayContainer.innerHTML = '';
      const w = computeBarWidth(arr.length);
      arr.forEach((val, idx) => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = val + 'px';
        bar.style.width = w + 'px';
        if (idx <= sortedUntil && sortedUntil >= 0) bar.style.background = 'var(--bar-sorted)';
        if (idx === highlightA || idx === highlightB) bar.style.background = 'var(--bar-compare)';
        arrayContainer.appendChild(bar);
      });
      updateStatus();
    }
    function setSortingUI(lock){
      isSorting = lock;
      qs('#generate').disabled = lock;
      qs('#sort').disabled = lock;
      qs('#algorithm').disabled = lock;
      qs('#size').disabled = lock;
      qs('#maxHeight').disabled = lock;
    }

    // -------- Visual sorts --------
    async function bubbleSortVisual(){
      resetCounters();
      for (let i=0;i<arr.length;i++){
        for (let j=0;j<arr.length-i-1;j++){
          comparisons++;
          renderArray({highlightA:j, highlightB:j+1, sortedUntil:arr.length-i});
          await sleep(delayMs);
          if (arr[j] > arr[j+1]){
            [arr[j],arr[j+1]] = [arr[j+1],arr[j]]; writes += 2;
            renderArray({highlightA:j, highlightB:j+1, sortedUntil:arr.length-i});
            await sleep(delayMs);
          }
        }
      }
      renderArray({sortedUntil:arr.length});
    }
    async function selectionSortVisual(){
      resetCounters();
      for (let i=0;i<arr.length;i++){
        let min=i;
        for (let j=i+1;j<arr.length;j++){
          comparisons++;
          renderArray({highlightA:min, highlightB:j, sortedUntil:i-1});
          await sleep(delayMs);
          if (arr[j] < arr[min]) min=j;
        }
        if (min!==i){
          [arr[i],arr[min]] = [arr[min],arr[i]]; writes += 2;
          renderArray({highlightA:i, highlightB:min, sortedUntil:i});
          await sleep(delayMs);
        }
      }
      renderArray({sortedUntil:arr.length});
    }
    async function insertionSortVisual(){
      resetCounters();
      for (let i=1;i<arr.length;i++){
        let key = arr[i]; writes++;
        let j = i-1;
        while (j>=0 && (comparisons++, arr[j] > key)){
          arr[j+1] = arr[j]; writes++;
          renderArray({highlightA:j, highlightB:j+1, sortedUntil:i-1});
          await sleep(delayMs);
          j--;
        }
        arr[j+1] = key; writes++;
        renderArray({highlightA:j+1, sortedUntil:i});
        await sleep(delayMs);
      }
      renderArray({sortedUntil:arr.length});
    }
    async function mergeSortVisual(){
      resetCounters();
      async function ms(l,r){
        if (l>=r) return;
        const m = (l+r>>1);
        await ms(l,m); await ms(m+1,r);
        let i=l, j=m+1; const tmp=[];
        while(i<=m && j<=r){
          comparisons++; renderArray({highlightA:i,highlightB:j}); await sleep(delayMs);
          tmp.push(arr[i] <= arr[j] ? arr[i++] : arr[j++]);
        }
        while(i<=m) tmp.push(arr[i++]);
        while(j<=r) tmp.push(arr[j++]);
        for (let k=0;k<tmp.length;k++){ arr[l+k]=tmp[k]; writes++; }
        renderArray({sortedUntil:r}); await sleep(delayMs);
      }
      await ms(0,arr.length-1);
      renderArray({sortedUntil:arr.length});
    }
    async function quickSortVisual(){
      resetCounters();
      async function qs(l,r){
        if (l>=r) return;
        const pivot = arr[r]; let i=l;
        for (let j=l;j<r;j++){
          comparisons++; renderArray({highlightA:j, highlightB:r}); await sleep(delayMs);
          if (arr[j] < pivot){ [arr[i],arr[j]] = [arr[j],arr[i]]; writes += 2; i++; renderArray({highlightA:i-1, highlightB:j}); await sleep(delayMs); }
        }
        [arr[i],arr[r]] = [arr[r],arr[i]]; writes += 2;
        await qs(l,i-1); await qs(i+1,r);
      }
      await qs(0,arr.length-1);
      renderArray({sortedUntil:arr.length});
    }
    async function runSelectedSort(){
      const algo = qs('#algorithm').value;
      setSortingUI(true); updateStatus('Sorting…');
      try {
        if (algo==='bubble') await bubbleSortVisual();
        else if (algo==='selection') await selectionSortVisual();
        else if (algo==='insertion') await insertionSortVisual();
        else if (algo==='merge') await mergeSortVisual();
        else if (algo==='quick') await quickSortVisual();
        updateStatus('Done');
      } finally {
        setSortingUI(false);
      }
    }

    // -------- Pure sorts for tests --------
    function bubbleSortPure(a){ a=[...a]; for(let i=0;i<a.length;i++) for(let j=0;j<a.length-i-1;j++) if(a[j]>a[j+1]) [a[j],a[j+1]]=[a[j+1],a[j]]; return a; }
    function selectionSortPure(a){ a=[...a]; for(let i=0;i<a.length;i++){ let m=i; for(let j=i+1;j<a.length;j++) if(a[j]<a[m]) m=j; if(m!==i) [a[i],a[m]]=[a[m],a[i]];} return a; }
    function insertionSortPure(a){ a=[...a]; for(let i=1;i<a.length;i++){ const k=a[i]; let j=i-1; while(j>=0 && a[j]>k){ a[j+1]=a[j]; j--; } a[j+1]=k; } return a; }
    function mergeSortPure(a){ if(a.length<2) return [...a]; const m=a.length>>1; const L=mergeSortPure(a.slice(0,m)), R=mergeSortPure(a.slice(m)); const out=[]; let i=0,j=0; while(i<L.length && j<R.length) out.push(L[i]<=R[j]?L[i++]:R[j++]); while(i<L.length) out.push(L[i++]); while(j<R.length) out.push(R[j++]); return out; }
    function quickSortPure(a){ a=[...a]; (function qs(l,r){ if(l>=r) return; const p=a[r]; let i=l; for(let j=l;j<r;j++) if(a[j]<p){ [a[i],a[j]]=[a[j],a[i]]; i++; } [a[i],a[r]]=[a[r],a[i]]; qs(l,i-1); qs(i+1,r); })(0,a.length-1); return a; }

    function arraysEqual(a,b){ if(a.length!==b.length) return false; for(let i=0;i<a.length;i++) if(a[i]!==b[i]) return false; return true; }

    function runTests(){
      const tests = [
        {name:'empty', data:[]},
        {name:'single', data:[5]},
        {name:'two-sorted', data:[1,2]},
        {name:'two-reverse', data:[2,1]},
        {name:'small-mixed', data:[5,3,8,1,2]},
        {name:'duplicates', data:[4,1,3,3,2,4,1]},
        {name:'negatives', data:[-3,10,-1,0,7]},
        {name:'already-sorted', data:[1,2,3,4,5,6,7,8,9]},
        {name:'reversed', data:[9,8,7,6,5,4,3,2,1]},
        {name:'large-ish', data:Array.from({length:50},()=>Math.floor(Math.random()*100))}
      ];
      const algos = [
        ['Bubble', bubbleSortPure],
        ['Selection', selectionSortPure],
        ['Insertion', insertionSortPure],
        ['Merge', mergeSortPure],
        ['Quick', quickSortPure],
      ];
      let log = 'Running sorting algorithm tests (compared with JS built-in sort)\\n\\n';
      let passAll = true;
      for (const t of tests){
        const expected = [...t.data].sort((a,b)=>a-b);
        log += `Test: ${t.name}\\n`;
        for (const [name, fn] of algos){
          const got = fn(t.data);
          const ok = arraysEqual(expected, got);
          passAll = passAll && ok;
          log += `  ${ok ? '✅' : '❌'} ${name}: ${JSON.stringify(got)}\\n`;
        }
        log += `  Expected: ${JSON.stringify(expected)}\\n\\n`;
      }
      log += passAll ? 'All tests passed! 🎉' : 'Some tests failed. Please tell me which.';
      testLog.textContent = log;
    }

    // -------- Wiring --------
    function generateAndRender(){
      arr = randomArray(parseInt(qs('#size').value,10), maxBarHeight);
      renderArray({});
      updateStatus('Ready');
    }
    function init(){
      const size = qs('#size');
      const speed = qs('#speed');
      const maxH = qs('#maxHeight');
      const sizeVal = qs('#sizeValue');
      const speedVal = qs('#speedValue');
      const heightVal = qs('#heightValue');

      size.addEventListener('input', () => { sizeVal.textContent = size.value; generateAndRender(); });
      speed.addEventListener('input', () => { delayMs = parseInt(speed.value,10); speedVal.textContent = speed.value; });
      maxH.addEventListener('input', () => { maxBarHeight = parseInt(maxH.value,10); heightVal.textContent = maxH.value; generateAndRender(); });

      qs('#generate').addEventListener('click', generateAndRender);
      qs('#sort').addEventListener('click', async () => { if (!isSorting) await runSelectedSort(); });
      qs('#runTests').addEventListener('click', runTests);

      delayMs = parseInt(speed.value,10);
      maxBarHeight = parseInt(maxH.value,10);
      sizeVal.textContent = size.value;
      speedVal.textContent = speed.value;
      heightVal.textContent = maxH.value;

      generateAndRender();
    }
    window.addEventListener('DOMContentLoaded', init);