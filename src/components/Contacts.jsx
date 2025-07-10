import { useState, useEffect } from "react";
import ContactsList from "./ContactsList";
import { v4 } from "uuid";
import styles from "./Contacts.module.css";
import Modal from "./Modal";
const input = [
  { type: "text", name: "name", placeholder: "Name" },
  { type: "text", name: "lastname", placeholder: "LastName" },
  { type: "email", name: "email", placeholder: "Email" },
  { type: "number", name: "phone", placeholder: "Phone" },
];
function Contacts() {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem("contacts");
    return saved ? JSON.parse(saved) : [];
  });
  const [alert, setAlert] = useState("");
  const [contact, setContact] = useState({
    id: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
  });
  const [selected, setSelected] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editContact, setEditContact] = useState({});
  const [modal, setModal] = useState({
    open: false,
    type: null,
    id: null,
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const changeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setContact((contacts) => ({ ...contacts, [name]: value }));
  };

  const addHandler = () => {
    if (
      !contact.name ||
      !contact.lastname ||
      !contact.email ||
      !contact.phone
    ) {
      setAlert("Please enter valid data.");
      return;
    }
    setAlert("");
    const newContact = { ...contact, id: v4() };
    setContacts((contacts) => [...contacts, newContact]);
    setContact({
      name: "",
      lastname: "",
      email: "",
      phone: "",
    });
  };

  const askDeleteHandler = (id) =>
    setModal({ open: true, type: "single", id });
  const askBatchDeleteHandler = () =>
    setModal({ open: true, type: "batch" });
  const closeModal = () =>
    setModal({ open: false, type: null, id: null });

  const confirmDelete = () => {
    if (modal.type === "single") {
      setContacts((contacts) =>
        contacts.filter((contact) => contact.id !== modal.id)
      );
      setSelected((selected) =>
        selected.filter((sid) => sid !== modal.id)
      );
    } else if (modal.type === "batch") {
      setContacts((contacts) =>
        contacts.filter((c) => !selected.includes(c.id))
      );
      setSelected([]);
    }
    closeModal();
  };

  const selectHandler = (id) => {
    setSelected((selected) =>
      selected.includes(id)
        ? selected.filter((sid) => sid !== id)
        : [...selected, id]
    );
  };

  const startEditHandler = (contact) => {
    setEditId(contact.id);
    setEditContact(contact);
  };

  const editChangeHandler = (e) => {
    const { name, value } = e.target;
    setEditContact((prev) => ({ ...prev, [name]: value }));
  };

  const saveEditHandler = () => {
    setContacts((contacts) =>
      contacts.map((c) =>
        c.id === editId ? { ...editContact, id: editId } : c
      )
    );
    setEditId(null);
    setEditContact({});
  };

  const cancelEditHandler = () => {
    setEditId(null);
    setEditContact({});
  };

  const filteredContacts = contacts.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.lastname.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q)
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {input.map((input, index) => (
          <input
            key={index}
            type={input.type}
            placeholder={input.placeholder}
            name={input.name}
            value={contact[input.name]}
            onChange={changeHandler}
          />
        ))}
        <button onClick={addHandler}>Add Contacts</button>
      </div>
      <div className={styles.alert}>{alert && <p>{alert}</p>}</div>
      <input
        type="text"
        placeholder="Search bar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          marginBottom: 16,
          padding: 8,
          borderRadius: 8,
          border: "1px solid #ccc",
        }}
      />
      <ContactsList
        contacts={filteredContacts}
        deleteHandler={askDeleteHandler}
        selected={selected}
        selectHandler={selectHandler}
        batchDeleteHandler={askBatchDeleteHandler}
        editId={editId}
        editContact={editContact}
        startEditHandler={startEditHandler}
        editChangeHandler={editChangeHandler}
        saveEditHandler={saveEditHandler}
        cancelEditHandler={cancelEditHandler}
      />
      <Modal
        open={modal.open}
        onClose={closeModal}
        onConfirm={confirmDelete}
        text={
          modal.type === "batch"
            ? "آیا از حذف همه مخاطبین انتخاب شده مطمئن هستید؟"
            : "آیا از حذف این مخاطب مطمئن هستید؟"
        }
      />
    </div>
  );
}

export default Contacts;
