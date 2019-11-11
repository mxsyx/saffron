async function dev() {
  for(let i = 0; i < 5; i++)  {
    return i;
  }
}

dev().then((i)=>{
  console.log(i);
})