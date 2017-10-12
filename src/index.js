import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Day extends React.Component {
    render() {
        if (this.props.disabled) {
            return (
                <div className="day day-disabled">
                    {this.props.date}
                </div>
            );
        } else {
            return <div className="day">{this.props.date}</div>
        }
    }
}

class Month extends React.Component {
    renderDay(i) {
        return (
            <Day
                date={this.props.days[i].date}
                disabled={this.props.days[i].disabled}
            />
        );
    }

    renderHeader() {
        return (
            <div className="month-row-header">
                <div className="header-day">
                    Mon
                </div>
                <div className="header-day">
                    Tue
                </div>
                <div className="header-day">
                    Wed
                </div>
                <div className="header-day">
                    Thu
                </div>
                <div className="header-day">
                    Fri
                </div>
                <div className="header-day">
                    Sat
                </div>
                <div className="header-day">
                    Sun
                </div>
            </div>
        );
    }

    renderRow(index) {
       return (
           <div className="month-row">
                {this.renderDay(index*7+0)}
                {this.renderDay(index*7+1)}
                {this.renderDay(index*7+2)}
                {this.renderDay(index*7+3)}
                {this.renderDay(index*7+4)}
                {this.renderDay(index*7+5)}
                {this.renderDay(index*7+6)}
           </div>
       );
    }

    render() {
        let end = null;
        if (this.props.days[35].disabled === false) {
            end = <div>{this.renderRow(5)} </div>
        }
        return (
            <div className="calendar-month">
                {this.renderHeader()}
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {end}
            </div>
        );
    }
}


function MonthNavButton(props) {
    return (
        <button className="monthNavButton" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Menu extends React.Component {
    render() {
        return (
            <div className="toolbar">
                <span className="button-group">
                    <MonthNavButton
                        onClick={() => this.props.todayClick()}
                        value="Today"
                    />
                    <MonthNavButton
                        onClick={() => this.props.prevMonthClick()}
                        value="Prev"
                    />
                    <MonthNavButton
                        onClick={() => this.props.nextMonthClick()}
                        value="Next"
                    />
                </span>
                <span className="toolbar-label">
                    {this.props.selectedYear} {getMonthName(this.props.selectedMonth)}
                </span>
                <span>
            
                </span>
            </div>
        );
    }
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        let today = new Date();
        let days = createDateArray(today.getMonth(), today.getFullYear());
        this.state = {
            selectedMonth: new Date().getMonth(),
            selectedYear: new Date().getFullYear(),
            days: days,
        };
    }

    handleTodayClick() {
        this.setState({
            selectedMonth: new Date().getMonth(),
            selectedYear: new Date().getFullYear(),
        });
    }

    handleNextMonthClick() {
        let nextMonth = this.state.selectedMonth + 1;
        let nextYear = this.state.selectedYear;
        if (nextMonth === 12) {
            nextMonth = 0;
            ++nextYear;
        }
        this.setState({
            selectedMonth: nextMonth,
            selectedYear: nextYear,
            days: createDateArray(nextMonth, nextYear),
        });
    }

    handlePrevMonthClick() {
        let prevMonth = this.state.selectedMonth - 1;
        let prevYear = this.state.selectedYear;
        if (prevMonth < 0) {
            prevMonth = 11;
            prevYear = this.state.selectedYear - 1
        }
        this.setState({
            selectedMonth: prevMonth,
            selectedYear: prevYear,
            days: createDateArray(prevMonth, prevYear),
        });
    }

    render() {
        return (
            <div className="calendar">
                <Menu 
                    selectedMonth={this.state.selectedMonth}
                    selectedYear={this.state.selectedYear}
                    todayClick={() => this.handleTodayClick()}
                    prevMonthClick={() => this.handlePrevMonthClick()}
                    nextMonthClick={() => this.handleNextMonthClick()}
                />
                <Month
                    days={this.state.days}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Calendar />,
    document.getElementById('root')
);

function getMonthName(month) {
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    return monthNames[month];
}


function createDateArray(month, year) {
    let startingDayOfWeek = new Date(year, month).getDay();
    console.log(startingDayOfWeek);
    if (startingDayOfWeek === 0) {
        startingDayOfWeek = 7;
    }

    let numberOfDaysInMonth = new Date(year, month + 1, 0).getDate();
    let numberOfDaysPrevMonth = new Date(year, month, 0).getDate();

    console.log(startingDayOfWeek, numberOfDaysInMonth, numberOfDaysPrevMonth, month, year);

    let dayArray = Array(42);
    for (var i = 0; i < 42; i++) {
        dayArray[i] = {date: null, disabled: false};
    }

    let counter = 0;
    for (var i = 1; i < startingDayOfWeek; i++) {
        let dayInPrevMonth = numberOfDaysPrevMonth - (startingDayOfWeek - i) + 1;
        dayArray[counter].disabled = true;
        dayArray[counter].date = dayInPrevMonth.toString();
        counter++;
        console.log("Before", counter, i);
    }
    for (i = 1; i < numberOfDaysInMonth + 1; i++) {
        dayArray[counter].date = i.toString().padStart(2, '0');
        counter++;
        console.log("Middle", counter, i);
    }
    for (i = 1; counter < 42; i++) {
        dayArray[counter].disabled = true;
        dayArray[counter].date = i.toString().padStart(2, '0');
        counter++;
    }
    console.log(dayArray);

    return dayArray;
}
