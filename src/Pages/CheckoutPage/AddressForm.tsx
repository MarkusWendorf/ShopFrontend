import * as React from "react";

interface Props {
    information: {
      name: string;
      city: string;
      citycode: string;
      street: string;
    };
    update: (key: string, event: any) => void;
    heading: string;
}

export default class AddressForm extends React.PureComponent<Props, {}> {

    public render() {

        const info = this.props.information;
        
        return (
            <>
                <div className="separator billing">{this.props.heading}</div>
                <div/>

                <div>
                    <label>Name</label>
                    <input
                        required={true}
                        value={info.name}
                        onChange={this.update("name")}
                    />
                </div>
                <div>
                    <label>Stadt</label>
                    <input
                        required={true}
                        value={info.city}
                        onChange={this.update("city")}
                    />
                </div>
                <div>
                    <label>Postleitzahl</label>
                    <input
                        required={true}
                        value={info.citycode}
                        onChange={this.update("citycode")}
                    />
                </div>
                <div>
                    <label>Straße und Hausnummer</label>
                    <input
                        required={true}
                        value={info.street}
                        onChange={this.update("street")}
                    />
                </div>
            </>
        );
    }
    
    private update = (key: string) => (e: any) => {
        this.props.update(key, e);
    };
}
