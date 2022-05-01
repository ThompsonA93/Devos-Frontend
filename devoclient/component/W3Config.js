import React, { useContext } from 'react';

// TODO :: Check what is actually required given Metamask
// TODO :: Make collapsible to maintain smaller side size
const W3Config = () => {

    const submitHandler = () => {
        console.log("Submitted new Data")
    }

    return (
        <form onSubmit={submitHandler}>
            <div className=''>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Network</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input className="input" type="text" placeholder="Provider-URL" />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control is-expanded has-icons-left has-icons-right">
                                <input className="input" type="email" placeholder="Chain-ID"/>
                                <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-check"></i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">Archive-Address</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <div className="control">
                                <input className="input" type="text" placeholder="e.g. 0x65544c30bC42b38EDFa0f1054c40678D8c41D63f" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

    )

}

export default W3Config;
