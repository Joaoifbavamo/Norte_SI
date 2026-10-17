import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

// Use npm's dev dependency, or an explicitly supplied automation runtime.
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.PLAYWRIGHT_MODULE_PATH||'playwright');
const browser=await chromium.launch({...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
try{
 const page=await browser.newPage({viewport:{width:1536,height:900},reducedMotion:'reduce'});
 const errors=[];page.on('pageerror',error=>errors.push(error.message));
 await page.route('**/*workers.dev/**',route=>route.abort());
 await page.goto(new URL('../index.html',import.meta.url).href);
 await page.evaluate(()=>{
  const space=newExam('Semestre de teste');space.subjects=baseSubjects();
  space.academic=siNewAcademic('semester','2026.2',2,'2024');
  db.exams=[space];db.activeExam=space.id;persist();go('percurso');
 });
 for(const width of [1536,960,768,390,320])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:844});
  await page.evaluate(theme=>{db.theme=theme;go('percurso');document.querySelectorAll('.curriculum-period').forEach(node=>node.open=true)},theme);
  const sizes=await page.locator('.si-course-row strong').evaluateAll(nodes=>nodes.map(n=>({width:n.getBoundingClientRect().width,height:n.getBoundingClientRect().height})));
  assert.ok(sizes.length>50);
  assert.ok(sizes.every(rect=>rect.width>=180&&rect.height<170),`Compressed curriculum labels: ${width}/${theme}`);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await page.evaluate(()=>{go('banco');bankFilterOpen=false;render()});
  assert.equal(await page.locator('#bank-filter-details').getAttribute('open'),null);
  await page.locator('#bank-filter-details>summary').click();
  await page.waitForFunction(()=>document.querySelector('#bank-filter-details').open);
  await page.locator('#bank-difficulty').selectOption('hard');
  assert.ok(await page.locator('#bank-subject').isVisible(),'Changing a filter collapsed the controls');
  await page.locator('#bank-filter-details>summary').click();
  await page.waitForFunction(()=>!document.querySelector('#bank-filter-details').open);
  assert.equal(await page.evaluate(()=>bankDifficulty),'hard');
  const original=await page.evaluate(()=>localStorage.getItem(STORE));
  await page.evaluate(()=>startTour('hoje'));
  await page.evaluate(()=>tourPosition(true));
  const geometry=await page.evaluate(()=>{
   const bubble=document.querySelector('.tour-bubble').getBoundingClientRect();
   const ring=document.querySelector('.tour-ring').getBoundingClientRect();
   const controls=document.querySelector('.tour-controls').getBoundingClientRect();
   return {visible:!document.querySelector('.tour-ring').hidden,
    overlap:Math.max(0,Math.min(bubble.right,ring.right)-Math.max(bubble.left,ring.left))*Math.max(0,Math.min(bubble.bottom,ring.bottom)-Math.max(bubble.top,ring.top)),
    controlsVisible:controls.top>=0&&controls.bottom<=innerHeight};
  });
  assert.ok(geometry.visible);assert.equal(geometry.overlap,0);assert.ok(geometry.controlsVisible);
  await page.evaluate(()=>endTour());
  assert.equal(await page.evaluate(()=>localStorage.getItem(STORE)),original,'Tour changed original records');
 }
 assert.deepEqual(errors,[]);
 console.log('PASS curriculum widths, filter state, tutorial geometry and data preservation in five viewport widths and both themes.');
}finally{await browser.close()}
