export default function Index(props) {
  return (
    <div className={props.active ?  "message-modal " : "none-modal"}>
      {props.children}
    </div>
  )
}
