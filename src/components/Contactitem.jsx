import styles from "./ContactItem.module.css";
function Contactitem({
  data: { id, name, lastname, email, phone },
  deleteHandler,
  selected = [],
  selectHandler = () => {},
  isEditing = false,
  editContact = {},
  startEditHandler = () => {},
  editChangeHandler = () => {},
  saveEditHandler = () => {},
  cancelEditHandler = () => {},
}) {
  return (
    <li className={styles.item}>
      <input
        className={styles.batchdelete}
        type="checkbox"
        checked={selected.includes(id)}
        onChange={() => selectHandler(id)}
      />
      {isEditing ? (
        <>
          <input
            className={styles.editinputs}
            name="name"
            value={editContact.name || ""}
            onChange={editChangeHandler}
            placeholder="Name"
          />
          <input
            className={styles.editinputs}
            name="lastname"
            value={editContact.lastname || ""}
            onChange={editChangeHandler}
            placeholder="LastName"
          />
          <input
            className={styles.editinputs}
            name="email"
            value={editContact.email || ""}
            onChange={editChangeHandler}
            placeholder="Email"
          />
          <input
            className={styles.editinputs}
            name="phone"
            value={editContact.phone || ""}
            onChange={editChangeHandler}
            placeholder="Phone"
          />
          <button
            className={styles.editconfirm}
            onClick={saveEditHandler}>
            ✅
          </button>
          <button
            className={styles.editcancel}
            onClick={cancelEditHandler}>
            ❌
          </button>
        </>
      ) : (
        <>
          <p>
            {name} {lastname}
          </p>
          <p>
            <span>✉️</span>
            {email}
          </p>
          <p>
            <span>📞</span>
            {phone}
          </p>
          <button
            onClick={() =>
              startEditHandler({ id, name, lastname, email, phone })
            }>
            ✏️
          </button>
          <button onClick={() => deleteHandler(id)}>🗑️</button>
        </>
      )}
    </li>
  );
}

export default Contactitem;
