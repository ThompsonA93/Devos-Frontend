import React, { useContext, useState } from 'react';
import { W3Context } from '../context/W3Context';
import { RemoteAPIContext } from '../context/RemoteAPIContext';

// TODO :: Make collapsible to maintain smaller side size
const ConfigForm = () => {
    const { archive, setArchive } = useContext(W3Context);
    const { restProviderURI, setRestProviderURI } = useContext(RemoteAPIContext);

    // TODO :: Find workaround for onChange-Writable issue
    const [tempArchive, setTempArchive] = useState('')
    const [tempRestURI, setTempRestURI] = useState('')

    const submitHandler = (e) => {
        e.preventDefault(); // Avoid reloading
        console.log("Submitted update Network Configuration")
        if (tempArchive) {
            console.log("Updating Archive Address-Configuration to " + archive);
            setArchive(tempArchive);
        }
        if (tempRestURI) {
            console.log("Updating Remote API Address-Configuration to " + restProviderURI);
            setRestProviderURI(tempRestURI);
        }

        tempArchive = '';
        tempRestURI = '';
    }

    return (
        <div className='mt-2'>
            <h3>Network reconfiguation</h3>
            <form onSubmit={submitHandler}>
                <div className=''>
                    <div className="field is-horizontal">
                        <div className="field-label is-normal">
                            <label className="label">Archive-Address</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="text" value={tempArchive} onChange={(e) => setTempArchive(e.target.value)} placeholder="e.g. 0x65544c30bC42b38EDFa0f1054c40678D8c41D63f" />
                                </div>
                            </div>
                        </div>
                        <div className="field-label is-normal mt-2">
                            <label className="label">REST-Server Address</label>
                        </div>
                        <div className="field-body">
                            <div className="field">
                                <div className="control">
                                    <input className="input" type="text" value={tempRestURI} onChange={(e) => setTempRestURI(e.target.value)} placeholder="e.g. https://hello.world.com/api" />
                                </div>
                            </div>
                        </div>
                        <div className="control m-2">
                            <button className="button is-link">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

    )

}

export default ConfigForm;
