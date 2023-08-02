import React from 'react'

const Footer = ({name,email,address,website , phone , bankAccount , bankName}) => {
    return (
      <>
        <footer className="flex gap-4 text-[8px] justify-between border-t-2 border-gray-300 ">
            <div>
              <h4>Cravens</h4>
              <p>{address}</p>
            </div>
            <div>
              <p><span>@</span>{email}</p>
              <p><span>m</span>{phone}</p>
            </div>
            <div className="w-[150px]">
              This company is registered in the business register under no. 87650000
            </div>
        </footer>
      </>
    );
}

    export default Footer;