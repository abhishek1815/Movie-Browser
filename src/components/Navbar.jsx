export default function Navbar(props) {

const searchText = props.searchText;
const setSearchText = props.setSearchText;
const handleSearch = props.handleSearch;

return (

<header className="app-header">

  <div className="header-inner">

    <div className="logo">
      <span className="logo-icon">▶</span>
      <span className="logo-text">CineVerse</span>
    </div>

    <form className="search-form" onSubmit={handleSearch}>

      <input
        className="search-input"
        type="text"
        placeholder="Search movies..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />

      <button className="search-btn">
        Search
      </button>

    </form>

  </div>

</header>

);

}
