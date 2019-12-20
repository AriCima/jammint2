import React, { useState, useEffect } from "react";


// CSS
import "./index.css";

const JamsBalance = () => {

    return (

        <div className="e-figures">
            <div className="e-figures-left">
                <div className="chart-title">
                    <p>Economic Overview: <span>{currentMonth}</span> </p>
                </div>
                <div className="user-overview">
                    <div className="overview-block">
                        <div className="overview-block-feature">
                            <p>Gross Incomes</p>  
                        </div>
                        <div className="overview-block-value">
                            <p>{aptsIncomes + roomsIncomes}</p>
                        </div>
                    </div>

                    <div className="overview-block-underlined">
                        <div className="overview-block-feature">
                            <p>Utilities</p>
                        </div>
                        <div className="overview-block-value">
                            <p>{currentUtilities}</p>
                        </div>
                    </div>
                    <div className="overview-block-result">
                        <div className="overview-block-feature">
                            <p><span>Net Incomes</span></p>
                        </div>
                        <div className="overview-block-value">
                            <p><span>{aptsIncomes + roomsIncomes - currentUtilities}</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default JamsBalance;