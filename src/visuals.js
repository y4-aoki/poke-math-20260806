export function selectPokemonImages(sprites={}){
  const artwork=sprites.other?.['official-artwork']?.front_default||null
  const fallback=sprites.front_default||sprites.other?.showdown?.front_default||null
  return{image:artwork||fallback,fallbackImage:fallback}
}

export function captureTranslation(targetRect,ballRect){
  return{
    x:targetRect.left+targetRect.width/2-(ballRect.left+ballRect.width/2),
    y:targetRect.top+targetRect.height/2-(ballRect.top+ballRect.height/2)
  }
}
