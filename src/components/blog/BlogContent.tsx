import HTMLParser from "html-react-parser";

export default function BlogPost({
    title,
    content,
}: {
    title: string;
    content: string;
}) {
    return (
        <div>
            <div>
                <div>
                    <h1>{title}</h1>
                </div>
                <div>{HTMLParser(content)}</div>
            </div>
        </div>
    );
}
