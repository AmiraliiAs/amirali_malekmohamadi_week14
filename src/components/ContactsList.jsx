import Contactitem from "./Contactitem";
import styles from "./ContactList.module.css";
function ContactsList({
  contacts,
  deleteHandler,
  selected,
  selectHandler,
  batchDeleteHandler,
  editId,
  editContact,
  startEditHandler,
  editChangeHandler,
  saveEditHandler,
  cancelEditHandler,
}) {
  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <h3>Contacts List</h3>
        {selected && selected.length > 0 && (
          <button
            onClick={batchDeleteHandler}
            style={{
              background: "#f44336",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              cursor: "pointer",
            }}>
            Delete Selected
          </button>
        )}
      </div>
      {contacts.length ? (
        <ul className={styles.contacts}>
          {contacts.map((contact) => (
            <Contactitem
              key={contact.id}
              data={contact}
              deleteHandler={deleteHandler}
              selected={selected}
              selectHandler={selectHandler}
              isEditing={editId === contact.id}
              editContact={editContact}
              startEditHandler={startEditHandler}
              editChangeHandler={editChangeHandler}
              saveEditHandler={saveEditHandler}
              cancelEditHandler={cancelEditHandler}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.message}>No contacts YET!!</p>
      )}
    </div>
  );
}

export default ContactsList;
