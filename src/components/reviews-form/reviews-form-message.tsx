type ReviewsFormMessageProps = {
  text: string;
}

function ReviewsFormMessage({ text }: ReviewsFormMessageProps): JSX.Element {
  return (
    <div data-testid='review-form-message-text'>{text}</div>
  );
}

export default ReviewsFormMessage;
