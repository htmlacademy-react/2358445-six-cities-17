type ReviewsFormMessageProps = {
  text: string;
}

function ReviewsFormMessage({ text }: ReviewsFormMessageProps): JSX.Element {
  return (
    <div>{text}</div>
  );
}

export default ReviewsFormMessage;
