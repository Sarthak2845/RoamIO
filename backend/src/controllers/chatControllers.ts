import type { Response, Request } from "express"
import { agent } from "../agent.js";
import { HumanMessage } from "langchain";
export const ChatWithAgent = async (req:Request, res:Response) => {
    try {
        const { message } = req.body;
        if(!message){
            return res.status(400).json({ error: "Message is required",success: false });
        }
        const result=await agent.invoke({
            messages:[new HumanMessage(message)]
        });
        const lastMessage = result.messages[result.messages.length - 1];
        if (!lastMessage) {
            return res.status(400).json({ error: "No response from agent", success: false });
        }
        res.json({ response: lastMessage.text,success: true });

    } catch (error) {
        console.error("Agent Error:", error);
        res.status(500).json({ error: "Something went wrong with the agent." });
    }
}