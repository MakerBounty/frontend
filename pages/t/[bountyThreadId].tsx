
import api from "../../lib/api";
import ReactMarkdown from "react-markdown";
import ErrorPage from "next/error";




const bountyThreadPage = props => {

};



bountyThreadPage.getInitialProps = async ctx => {
    try {
        const id = ctx.query.bountyThreadId;
        const thread = await api.server("GET", `/api/thread/describe/long/${id}`, ctx);
        return { thread, };
    } catch (e) {
        return {
            thread: {
                status: 500,
                text: "Failed to find thread"
            }
        }
    }



};

export default bountyThreadPage;