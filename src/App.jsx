import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Contacts from "./data/contacts.json"
import Contact from "./components/Contact/Contact.jsx";
import femaleAvatar from "./assets/femaleAvatar.png";
import maleAvatar from "./assets/maleAvatar.png";
import elderFemaleAvatar from "./assets/elderFemaleAvatar.png";
import elderMaleAvatar from "./assets/elderMaleAvatar.png";
import PlaceHolderAvatar from "./assets/placeHolderAvg.png";


const App = () => {
    const [contacts, setContacts] = useState(Contacts);
    const [filteredContacts, setFilteredContacts] = useState(contacts);
    const [displayContacts, setDisplayContacts] = useState(filteredContacts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    const [selectedAvatar, setSelectedAvatar] = useState("default");
    
    useEffect(() => {
        setLoading(true)
        const ContactForPage = filteredContacts.slice((currentPage - 1) * itemsPerPage, Math.min(currentPage * itemsPerPage, filteredContacts.length));
        setDisplayContacts(ContactForPage);
        setLoading(false);
    }, [currentPage, itemsPerPage,filteredContacts]);

    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage, filteredContacts]);



    const [query, setQuery] = useState("");
    useEffect(() => {
        if (query === "") {
            setFilteredContacts(contacts);
            console.log("reset");
            return;
        }
        const result = contacts.filter((contact =>
            contact.name.toLowerCase().includes(query.toLowerCase()) ||
            contact.phone.toLowerCase().includes(query.toLowerCase())
        ));
        setFilteredContacts(result);
    }, [query, contacts]);

    const [form, setForm] = useState({ name: "", phone: "", email: "" });

    function handleSubmit(e) {
        e.preventDefault();
        const newContact = {
            id: Date.now(),
            name: form.name,
            phone: form.phone,
            email: form.email,
            avatar: selectedAvatar
        };
        setContacts((prevContacts) => [...prevContacts, newContact]);
        setForm({ name: "", phone: "", email: "" });
        setSelectedAvatar("default");
    }

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const handleNextPage = () => {
        if (currentPage * itemsPerPage >= filteredContacts.length) return;
        setCurrentPage((prevPage) => prevPage + 1);
    }


    return (
        <main className="page" data-testid="page-root">
            <header className="page__header">
                <h1 className="page__title">Phonebook Challenge</h1>
                <p className="page__subtitle">A simple contact directory</p>
            </header>

            <section className="search" aria-labelledby="search-heading">
                <h2 id="search-heading">Search Contacts</h2>
                <div className="search__controls">
                    <label htmlFor="search-input">Search</label>
                    <input
                        id="search-input"
                        type="search"
                        placeholder="Search by name or phone"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        data-testid="search-input"
                    />
                </div>

                <p className="search__results" data-testid="results-count">
                    Showing {contacts.length}{" "}
                    {contacts.length === 1 ? "result" : "results"}
                    {loading ? " (loading...)" : ""}
                    {error ? ` (error: ${error})` : ""}
                </p>
                
            </section>

            <section className="contacts" aria-labelledby="contacts-heading">
                <h2 id="contacts-heading">Contacts</h2>
                
                <ul className="contacts__grid">
                    { loading && <p>Loading...</p> }
                    { error && <p>Error: {error}</p> }
                    {
                        displayContacts.map((contact) => (
                            <Contact
                                key={contact.id}
                                id={contact.id}
                                name={contact.name}
                                avatar={contact.avatar}
                                phone={contact.phone}
                                email={contact.email}
                            />
                        ))
                    }
                </ul>
                <div className="pagination">
                    <button onClick={handlePreviousPage}>Previous</button>
                    <span>Page {currentPage}</span>
                    <button onClick={handleNextPage}>Next</button>
                    <span>Items per page:</span>
                    <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))}>
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                    </select>
                </div>

            </section>

            <section className="form" aria-labelledby="form-heading">
                <h2 id="form-heading">Add a Contact</h2>
                <form className="form__body" onSubmit={(e) => handleSubmit(e)} noValidate>
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={form.name}
                            placeholder="John Smith"
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            required
                            minLength={2}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input
                            id="phone"
                            name="phone"
                            inputMode="tel"
                            placeholder="(555) 555-5555"
                            value={form.phone}
                            onChange={(e) =>
                                setForm({ ...form, phone: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={form.email}
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            required
                            
                        />
                    </div>
                    <div className="avatar">
                        <label htmlFor="avatar">Avatar</label>
                        <label htmlFor="placeHolder">
                            <input type="radio" value="ph" name="avatar" checked={selectedAvatar === 'default'} onChange={() => setSelectedAvatar('default')} />
                            <img src={PlaceHolderAvatar} alt="Placeholder Avatar" className="avatar__img" />
                        </label>
                        <label htmlFor="female">
                            <input type="radio" value="f" name="avatar" checked={selectedAvatar === 'fm'} onChange={() => setSelectedAvatar('fm')} />
                            <img src={femaleAvatar} alt="Female Avatar" className="avatar__img" />
                        </label>
                        <label htmlFor="male">
                            <input type="radio" value="m" name="avatar" checked={selectedAvatar === 'm'} onChange={() => setSelectedAvatar('m')} />
                            <img src={maleAvatar} alt="Male Avatar" className="avatar__img" />
                        </label>
                        <label htmlFor="elderFemale">
                            <input type="radio" value="ef" name="avatar" checked={selectedAvatar === 'ef'} onChange={() => setSelectedAvatar('ef')} />
                            <img src={elderFemaleAvatar} alt="Elder Female Avatar" className="avatar__img" />
                        </label>
                        <label htmlFor="elderMale">
                            <input type="radio" value="em" name="avatar" checked={selectedAvatar === 'em'} onChange={() => setSelectedAvatar('em')} />
                            <img src={elderMaleAvatar} alt="Elder Male Avatar" className="avatar__img" />
                        </label>

                    </div>
                    <br />
                    <div className="form__actions">
                        <button className="btn" type="submit" data-testid="btn-add">
                            Add Contact
                        </button>
                    </div>
                </form>
            </section>

            <footer className="page__footer">
                <small>
                    Starter provided. Complete tasks per README and make this page
                    shine.
                </small>
            </footer>
        </main>
    );
};

export default App;
