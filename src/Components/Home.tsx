import axios from "axios";
import * as React from "react";
import "./home.css";

const Home = () => {
    const [state, setState] = React.useState<any>({
        tst: 0,
        tcc: 0,
        tac: 0,
        tdis: 0,
        tdth: 0,
        view: 1,
        states: [],
        selectedState: "",
        chosenState: {cases: 0, admission: 0, discharged: 0, death: 0}
    })
    const { tst, tcc, tac, tdis, tdth, view, states, selectedState, chosenState } = state;
    React.useEffect(() => {
        axios.get(`https://covidnigeria.herokuapp.com/api`,)
        .then((response) => {
            console.log(response);
            setState({
                ...state,
                tst: response?.data?.data?.totalSamplesTested, 
                tcc: response?.data?.data?.totalConfirmedCases,
                tac: response?.data?.data?.totalActiveCases,
                tdis: response?.data?.data?.discharged,
                tdth: response?.data?.data?.death,
                states: response?.data?.data?.states,
            })
        })
        .catch ((error) => {})
    }, [])

    const toggleView = () => {
        if(view === 1) {
            return setState({
                ...state,
                view: 2,
            })
        }
        else if(view === 2) {
            return setState({
                ...state,
                view: 1,
            })
        }
        else {
            return setState({
                ...state,
                view: 1,
            })
        }
    }
    const handleChange = (e: any) => {
        getStateData(e.target.value);
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const getStateData = (val: any) => {
        states.map((item: any) => {
        if(item.state === val) {
            chosenState.cases = item.confirmedCases;
            chosenState.admission = item.casesOnAdmission;
            chosenState.discharged = item.discharged;
            chosenState.death = item.death;
        }
    }
    )}
    return (
        <>
            <div className="cn-container">
                <h1 className="cn-ttl">Get Information about COVID-19 Impact in Nigeria</h1>
                <div className="cn-overview">
                    <div className="cn-ov-item cn-ov-samples">
                        <div className="cn-ov-sub">
                        <i className="fas fa-vial cn-icon"></i>
                        <span className="cn-ov-txt">Total Samples Tested</span>
                        </div>
                        <div className="cn-ov-num">{tst}</div>
                    </div>
                    <div className="cn-ov-item cn-ov-confirmed">
                        <div className="cn-ov-sub">
                        <i className="fas fa-check cn-icon"></i>
                        <span className="cn-ov-txt">Total Confirmed Cases</span>
                        </div>
                        <div className="cn-ov-num">{tcc}</div>
                    </div>
                    <div className="cn-ov-item cn-ov-active">
                        <div className="cn-ov-sub">
                        <i className="fas fa-chart-line cn-icon"></i>
                        <span className="cn-ov-txt">Total Active Cases</span>
                        </div>
                        <div className="cn-ov-num">{tac}</div>
                    </div>
                    <div className="cn-ov-item cn-ov-discharged">
                        <div className="cn-ov-sub">
                        <i className="fas fa-walking cn-icon"></i>
                        <span className="cn-ov-txt">Total Discharged Persons</span>
                        </div>
                        <div className="cn-ov-num">{tdis}</div>
                    </div>
                    <div className="cn-ov-item cn-ov-death">
                        <div className="cn-ov-sub">
                        <i className="fas fa-dove cn-icon"></i>
                        <span className="cn-ov-txt">Total Deaths</span>
                        </div>
                        <div className="cn-ov-num">{tdth}</div>
                    </div>
                </div>

                <div className="cn-list">
                    <div className="cn-list-select">
                        <p>See state specific COVID-19 information</p>
                        <div className="cn-select">
                            <span>Select a state</span>
                            <div className="cn-select-out"><div className={view === 1 ? "cn-select-in" : "cn-select-in cn-float"} onClick={toggleView}></div></div>
                            <span>View all</span>
                        </div>
                    </div>
                    {view === 1 && (
                    <select
                            id="state"
                            className="cn-select-state"
                            name="selectedState"
                            onChange={handleChange}
                            value={selectedState}
                        >
                            <option value="" disabled selected hidden></option>
                            {states.map((x: any, i: any) => (
                            <option key={i} value={x.state}>{x.state}</option>
                            ))}
                        </select>)}
                        <div className="cn-list-state">
                        {(view === 1 && selectedState !== "") && (
                        <div>
                            <p className="cn-state">{selectedState}</p>
                            <div className="cn-list-info">
                                <div className="cn-list-data cn-list-confirmed">
                                    <p>Confirmed Cases</p>
                                    <p>{chosenState.cases}</p>
                                </div>
                                <div className="cn-list-data cn-list-admission">
                                    <p>Cases on Admission</p>
                                    <p>{chosenState.admission}</p>
                                </div>
                                <div className="cn-list-data cn-list-discharged">
                                    <p>Discharged</p>
                                    <p>{chosenState.discharged}</p>
                                </div>
                                <div className="cn-list-data cn-list-death">
                                    <p>Death</p>
                                    <p>{chosenState.death}</p>
                                </div>
                            </div>
                            </div>
                        )}
                        {view === 2 && states.map((x: any) => (
                        <div>
                            <p className="cn-state">{x.state}</p>
                            <div className="cn-list-info">
                                <div className="cn-list-data cn-list-confirmed">
                                    <p>Confirmed Cases</p>
                                    <p>{x.confirmedCases}</p>
                                </div>
                                <div className="cn-list-data cn-list-admission">
                                    <p>Cases on Admission</p>
                                    <p>{x.casesOnAdmission}</p>
                                </div>
                                <div className="cn-list-data cn-list-discharged">
                                    <p>Discharged</p>
                                    <p>{x.discharged}</p>
                                </div>
                                <div className="cn-list-data cn-list-death">
                                    <p>Death</p>
                                    <p>{x.death}</p>
                                </div>
                            </div>
                            </div>
                        ))}
                        </div>
                </div>
            </div>
        </>
    )
    
}

export default Home;