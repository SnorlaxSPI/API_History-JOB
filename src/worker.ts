import { consumer } from './rabbitmq-server';
import { HistoryGeneratorService } from './services/HistoryGeneratorService';
import { EVENTS, queueEvent } from './rabbitmq-server';

console.log("🚀🚀 Worker started");

//function debounce(func: { (message: { content: string; }): Promise<void>; apply?: any; }, wait: number | undefined, immediate: boolean) {
//    var timeout: NodeJS.Timeout | null;
//    return function () {
//        var context = this, args = arguments;
//        clearTimeout(timeout);
//        if (immediate && !timeout) {
//            func.apply(context, args);
//            immediate=false;
//        }
//        timeout = setTimeout(function () {
//            timeout = null;
//            if (!immediate) func.apply(context, args);
//        }, wait);
//    };
//}

const fnConsumer = async (message: { content: string; }) => {

    const history = await JSON.parse(message.content);
    console.log("processing ", history);

    try {
        const historyGeneratorService = new HistoryGeneratorService();
        const historyGenerate = await historyGeneratorService.execute(history.companyId, history.clientKey, history.dateFrom, history.dateTo);

        queueEvent.emit(EVENTS.finish, message);

    } catch (error) {
        console.error(error);
        queueEvent.emit(EVENTS.error, message);
    }

};

//consumer('companyData', debounce(fnConsumer, 10*1000, true))

consumer('companyData', fnConsumer)