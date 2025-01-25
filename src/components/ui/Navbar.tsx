import React from "react";
import logo from "../../assets/images/logo1.png";
import cart from "../../assets/images/add-card.png";
import profile from "../../assets/images/profile.png";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={navStyle}>
            {/* Logo Section */}
            <div style={logoStyle}>
                <img src={logo} alt="Logo" style={logoImageStyle} />
                <h2 style={brandNameStyle}>nsbooks.ae</h2>
            </div>

            {/* Navigation Links */}
            <ul style={ulStyle}>
                <li style={liStyle}>Books</li>
                <li style={liStyle}>Arts and Crafts</li>
                <li style={liStyle}>Stationery</li>
                <li style={liStyle}>Classroom Supplies</li>
            </ul>

            {/* Cart, Profile, and Login Section */}
            <div style={rightSectionStyle}>
                <img src={cart} alt="Cart" style={iconStyle} />
                <img src={profile} alt="Profile" style={iconStyle} />
                <Link to="/login"><button style={loginButtonStyle}>Login</button></Link>
            </div>
        </nav>
    );
};

// Styles
const navStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#001845",
    padding: "10px 20px",
    height: "70px",
    borderRadius: "10px",
    color: "white",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const logoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
};

const logoImageStyle: React.CSSProperties = {
    height: "40px",
    objectFit: "contain",
};

const brandNameStyle: React.CSSProperties = {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    margin: 0,
};

const ulStyle: React.CSSProperties = {
    listStyle: "none",
    display: "flex",
    gap: "20px",
    margin: 0,
    padding: 0,
    flex: "1",
    justifyContent: "center",
};

const liStyle: React.CSSProperties = {
    color: "white",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "color 0.3s",
    // textTransform: "uppercase"
};

const rightSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
};

const iconStyle: React.CSSProperties = {
    height: "30px",
    cursor: "pointer",
    transition: "transform 0.2s",
};

const loginButtonStyle: React.CSSProperties = {
    backgroundColor: "#f1c40f",
    color: "#001845",
    border: "none",
    padding: "8px 15px",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
    fontSize: "14px",
    
};

export default Navbar;
