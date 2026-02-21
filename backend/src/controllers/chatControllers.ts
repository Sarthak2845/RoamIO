import type { Response, Request } from "express"
import { agent } from "../agent.js";
import { HumanMessage } from "langchain";
import logger from "../utils/logger.js";

export const ChatWithAgent = async (req:Request, res:Response) => {
    try {
        const { message } = req.body;
        logger.info('Received chat request', { message });
        
        if(!message){
            logger.warn('Message is missing in request');
            return res.status(400).json({ error: "Message is required",success: false });
        }
        
        logger.debug('Invoking agent with message');
        const result=await agent.invoke({
            messages:[new HumanMessage(message)]
        });
        
        const lastMessage = result.messages[result.messages.length - 1];
        if (!lastMessage) {
            logger.error('No response from agent');
            return res.status(400).json({ error: "No response from agent", success: false });
        }
        
        logger.info('Agent response generated successfully');
        res.json({ response: lastMessage.text,success: true });

    } catch (error) {
        logger.error('Agent error occurred', { error });
        res.status(500).json({ error: "Something went wrong with the agent." });
    }
}