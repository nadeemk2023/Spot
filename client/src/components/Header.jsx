import React from 'react';

const headerContainerStyle = {
  padding: '10px',
  color: '#fff',
  fontSize: '24px',
};

function Header() {
  //! Change name of slogan here to whatever seems right, may be removed later if I get the bootstrap carousel components working and use that as the main header
  return (
    <div style={headerContainerStyle}>
      <img
        src="https://i.imgur.com/kweIvft.png"
        alt=""
        style={{ height: '150px' }}
      />
    </div>
  );
}

export default Header;
