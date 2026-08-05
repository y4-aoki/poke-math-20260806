import test from'node:test'
import assert from'node:assert/strict'
import{captureTranslation,isCorrectReviewAnswer,selectPokemonImages}from'../src/visuals.js'

test('official artwork is preferred for consistent battle sizing',()=>{
  const images=selectPokemonImages({front_default:'front.png',other:{showdown:{front_default:'animated.gif'},'official-artwork':{front_default:'artwork.png'}}})
  assert.deepEqual(images,{image:'artwork.png',fallbackImage:'front.png'})
})

test('capture translation aligns the ball and target centers',()=>{
  const offset=captureTranslation({left:200,top:100,width:240,height:240},{left:600,top:360,width:80,height:80})
  assert.deepEqual(offset,{x:-320,y:-180})
})

test('review answers must match before advancing',()=>{
  const problem={answer:12}
  assert.equal(isCorrectReviewAnswer(problem,''),false)
  assert.equal(isCorrectReviewAnswer(problem,'11'),false)
  assert.equal(isCorrectReviewAnswer(problem,'12'),true)
})
