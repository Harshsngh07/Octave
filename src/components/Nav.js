import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const toggle = () => {
    setLibraryStatus(!libraryStatus);
  };

  return (
    <nav>
      <h1>Octave</h1>
      <button
        className={`libraryStatus? ".library-active": ""`}
        onClick={toggle}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};

export default Nav;
