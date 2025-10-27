import { useEffect, useMemo, useState } from "react";
import "./App.css";
import Contacts from "./data/contacts.json"
import Contact from "./components/Contact/Contact.jsx";


const App = () => {
    const [contacts, setContacts] = useState(Contacts);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(1);
    
    useEffect(() => {
        const ContactForPage = Contacts.slice((currentPage - 1) * itemsPerPage, Math.min(currentPage * itemsPerPage, Contacts.length));
        setContacts(ContactForPage);
    }, [currentPage, itemsPerPage]);

    const [query, setQuery] = useState("");

    const [form, setForm] = useState({ name: "", phone: "", email: "" });
    function handleSubmit(e) {
        e.preventDefault();
        // Add contact submission logic here
    }

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    }

    const handleNextPage = () => {
        if (currentPage * itemsPerPage >= Contacts.length) return;
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
                    {
                        contacts.map((contact) => (
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
                <form className="form__body" onSubmit={handleSubmit} noValidate>
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
                        />
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
