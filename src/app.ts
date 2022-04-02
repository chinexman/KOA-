import Koa from 'koa';
import Router from 'koa-router';
import bodyparser from 'koa-bodyparser'
import  {dataIsValid} from './helper/function';


const app = new Koa();
app.use(bodyparser())
const router = new Router();



const httpStatus = {
    BAD_REQUEST: 400
}




router.post('/parseData', async (ctx) => {
    const parsingResponse = dataIsValid(ctx.request.body);
    if (parsingResponse.error) {
        ctx.status = httpStatus.BAD_REQUEST;
        ctx.body = parsingResponse.error
    } else {
        ctx.body = parsingResponse.success
    }


});



app.use(router.routes());


export default app