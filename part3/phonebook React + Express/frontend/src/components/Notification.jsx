const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className={message.includes("Added") ? "pop-up-green" : "pop-up-red"}>
        {message}
      </div>
    )
  }

export default Notification;