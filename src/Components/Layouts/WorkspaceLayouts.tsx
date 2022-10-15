import React from "react";
import {LayoutsProps, LayoutsState} from "./LayoutsTypes";
import {IoAppsSharp, IoChevronDownSharp, IoArrowUndoSharp, IoGrid}
    from "react-icons/io5";

export default class WorkspaceLayouts
    extends React.Component<LayoutsProps, LayoutsState> {
    render() {
        const leftMenuList: Array<string> = [
            "По проекту", "Объекты", "РД", "МТО", "СМР",
            "График", "МиМ", "Рабочие", "Капвложения",
            "Бюджет", "Финансирование", "Панорамы", "Камеры",
            "Поручения", "Контрагенты",
        ];

        return (
            <div className="layouts">
                <div className="top-menu">
                    <ul className="top-left-menu-list">
                        <li className="icon"><IoAppsSharp/></li>
                        <li className="icon"><IoArrowUndoSharp/></li>
                        <li>Просмотр</li>
                        <li>Управление</li>
                    </ul>
                    <ul className="top-right-menu-list">
                        <li className="avatar">
                            <img src={require('../../images/avatar.png')} alt={"avatar"}/>
                        </li>
                        <li>Антон Петров</li>
                        <li className="icon"><IoChevronDownSharp/></li>
                    </ul>
                </div>
                <div className="main">
                    <div className="left-menu">
                        <div className="left-menu-title">
                            <div>
                                <p>Название проекта</p>
                                <p className="subtitle">Аббревиатура</p>
                            </div>
                            <span className="icon"><IoChevronDownSharp/></span>
                        </div>
                        <ul>
                            {leftMenuList.map((item, index)=>{
                                return (
                                    <li
                                        key={index}
                                        className={item === "СМР" ? "selected" : ""}
                                    >
                                        <span className="list-icon"><IoGrid/></span>
                                        <span>{item}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="content">
                        <div className="content-title">
                            <div>Строительно-монтажные работы</div>
                        </div>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
