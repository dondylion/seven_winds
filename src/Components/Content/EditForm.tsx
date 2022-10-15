import React from "react";
import {AiFillFileText} from "react-icons/ai";
import {EditFormProps, EditFormState} from "./ContentTypes";
import {connect} from 'react-redux';
import {changeRows} from "../../store/rootReducer";
import store from "../../store/store";
import { saveRow } from "../../MustHaveCode";

class EditForm extends React.Component<EditFormProps, EditFormState> {
    constructor(props: EditFormProps) {
        super(props);
    }

    onSubmit = () => {
        const form = document.forms['editRow'];
        const data: any = {};

        data.title = form?.title?.value ? form.title?.value : "Нет данных";
        data.unit = form?.unit?.value ? form.unit?.value : "Нет данных";
        data.quantity = form?.quantity?.value ? form.quantity?.value : "Нет данных";
        data.unitPrice = form?.unitPrice?.value ? form.unitPrice?.value : "Нет данных";

        data.type = 'row';
        data.parent = null;

        if (typeof parseFloat(data.quantity) === 'number' && typeof parseFloat(data.unitPrice) === 'number') {
            data.price = data.quantity * data.unitPrice;
        } else {
            data.price = "Нет данных";
        }

        const {rows} = this.props;
        
        const storage = rows ? rows : [];
        const newRow = saveRow(data, storage);
        
        if (rows === null) {
            store.dispatch(changeRows([newRow.current]));
        } else {
            store.dispatch(changeRows([...rows, newRow.current]));
        }
    }

    render() {
        const {type} = this.props;

        return (
            <form className="table-grid table-row" name="editRow">
                <div><AiFillFileText/></div>
                <div>
                    <input
                        name="title"
                        onKeyDown={(e)=>{
                            if (e.key === 'Enter') this.onSubmit();
                        }}
                    />
                </div>
                <div>
                    {type === 'row' &&
                        <input
                            name="unit"
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter') this.onSubmit();
                            }}
                        />
                    }
                </div>
                <div>
                    {type === 'row' &&
                        <input
                            name="quantity"
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter') this.onSubmit();
                            }}
                            type="number"
                        />
                    }
                </div>
                <div>
                    {type === 'row' &&
                        <input
                            name="unitPrice"
                            onKeyDown={(e)=>{
                                if (e.key === 'Enter')  this.onSubmit();
                            }}
                            type="number"
                        />
                    }
                </div>
                <div/>
            </form>
        );
    }
}

const mapStateToProps = function(state) {
    return {
      rows: state.rowsReducer.rows,
    };
  };
  
export default connect(mapStateToProps)(EditForm);
