import koa from 'koa'

const app= new koa();

app.use((ctx)=>{
  ctx.body=123;
})

app.listen(3333)
