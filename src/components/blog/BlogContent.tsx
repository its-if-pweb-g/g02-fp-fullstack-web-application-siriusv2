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
          <p className="text-5xl font-bold pt-10 text-center">{title}</p>
        </div>
        <div className="prose max-w-none mt-12 text-black">
          {HTMLParser(content)}
        </div>
      </div>
    </div>
  );
}
