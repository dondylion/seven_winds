import React from "react";
import {ContentProps, ContentState} from "./ContentTypes";
import {AiFillFileText} from "react-icons/ai";
import EditForm from "./EditForm";
import {connect} from 'react-redux';
import store from "../../store/store";
import {saveRow} from "../../MustHaveCode";
import {changeRows} from "../../store/rootReducer";

class Content extends React.Component<ContentProps, ContentState> {
    private firstLevelIcon = <img src={require('../../images/level1.png')} alt={"level 1"} className="level-icon"/>;
    private secondLevelIcon = <img src={require('../../images/level2.png')} alt={"level 2"} className="level-icon"/>;
    private rowIcon = <AiFillFileText className="level-icon"/>;

    constructor (props: ContentProps) {
        super(props);

        this.state = {
            editedElement: null,
            coveredIcon: null,
            createdElement: 'row',
            editMode: false,
        }
    }

    componentDidMount = () => {
        if (!this.props.rows) this.setState({editMode: true});
    }

    componentDidUpdate = (prevProps: ContentProps, prevState: ContentState) => {
        const {rows} = this.props;
        if (rows && prevProps.rows) {
            if (rows.length !== prevProps.rows.length) {
                this.setState({editedElement: rows[rows.length-1].id, editMode: true});
            }
        }
    }

    renderSelectLevel = (type: 'level' | 'row', parent: number | null, id: number) => {
        const rows = this.props.rows ? [...this.props.rows] : [];
        const emptyRow = {
            title: '',
            unit: '',
            quantity: 0,
            unitPrice: 0,
            price: 0,
            parent: parent,
            type: type,
        };

        const createNewRow = (newRow, oldRows) => {
            saveRow(newRow, oldRows);
            store.dispatch(changeRows(oldRows));
        }

        return (
            <ul className="select-level">
                {type === 'level' && !parent &&
                    <li
                        onClick={()=>{
                            emptyRow.parent = null;
                            createNewRow(emptyRow, rows);
                        }}
                        key="1"
                    >
                        {this.firstLevelIcon}
                    </li>
                }
                {type === 'level' &&
                    <li
                        onClick={()=>{
                            emptyRow.parent = !parent ? id : parent;
                            createNewRow(emptyRow, rows);
                        }}
                        key="2"
                    >
                        {this.secondLevelIcon}
                    </li>
                }
                <li
                    onClick={()=>{
                        emptyRow.type = 'row';
                        emptyRow.parent = id;
                        createNewRow(emptyRow, rows);
                    }}
                    key="3"
                >
                    {this.rowIcon}
                </li>
            </ul>
        );
    }

    renderIcon = (type: 'level' | 'row', parent: number | null) => {
        if (type === 'level' && parent === null) return this.firstLevelIcon;
        if (type === 'level' && parent !== null) return this.secondLevelIcon;
        if (type === 'row') return this.rowIcon;
    }

    renderRows = () => {
        const {rows} = this.props;
        const {editedElement, coveredIcon, editMode} = this.state;
        const iconStyle = (type: 'level' | 'row', parent: number | null) => {
            const style = {cursor: 'pointer', width: '40%'};
            if (type === 'level' && parent === null) style['textAlign'] = 'start';
            if (type === 'level' && parent !== null) style['textAlign'] = 'center';
            if (type === 'row') style['textAlign'] = 'end';
            return style;
        }

        if (rows) {
            return (
                <>
                    {rows.map((item)=>{
                        if (item.id !== editedElement) {
                            return (
                                <div className="table-row table-grid" key={item.id}>
                                    <div
                                        style={iconStyle(item.type, item.parent)}
                                        onMouseOver={()=>{
                                            if (!editMode) this.setState({coveredIcon: item.id})
                                        }}
                                        onMouseLeave={()=>{this.setState({coveredIcon: null})}}
                                    >
                                        {
                                            item.id === coveredIcon ?
                                                <>{this.renderSelectLevel(item.type, item.parent, item.id)}</> :
                                                <>{this.renderIcon(item.type, item.parent)}</>
                                        }
                                    </div>
                                    <div
                                        onDoubleClick={()=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.title}
                                    </div>
                                    <div
                                        onDoubleClick={()=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.type === "row" ? item.unit : ""}
                                    </div>
                                    <div
                                        onDoubleClick={()=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.type === "row" ? item.quantity : ""}
                                    </div>
                                    <div
                                        onDoubleClick={()=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.type === "row" ? item.unitPrice : ""}
                                    </div>
                                    <div
                                        onDoubleClick={()=>{
                                            if (!editedElement) this.setState({editedElement: item.id})
                                        }}
                                    >
                                        {item.price}
                                    </div>
                                </div>
                            );
                        } else {
                            return (
                                <EditForm
                                    type={item.type}
                                    currentRow={item}
                                    key={item.id}
                                    onFinish={()=>this.setState({editedElement: null, editMode: false})}
                                    icon={this.renderIcon(item.type, item.parent)}
                                    parent={item.parent}
                                />
                            );
                        }
                    })}
                </>
            );
        }
    }

    render () {
        return (
            <div className="table">
                <div className="table-header table-grid">
                    <div>Уровень</div>
                    <div>Наименование работ</div>
                    <div>Ед. изм.</div>
                    <div>Количество</div>
                    <div>Цена за ед.</div>
                    <div>Стоимость</div>
                </div>
                
                {this.renderRows()}

                {!this.props.rows &&
                    <EditForm
                        type="level"
                        currentRow={null}
                        onFinish={()=>this.setState({editMode: false})}
                        icon={this.renderIcon('level', null)}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return {
      rows: state.rowsReducer.rows,
    };
  };
  
export default connect(mapStateToProps)(Content);
  