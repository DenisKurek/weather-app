export default function ErrorMessage(props) {
  return (
    <div className="alert alert-danger" role="alert">
      <strong>Error:</strong> {props.message}
    </div>
  );
}
