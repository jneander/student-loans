import React from 'react';
import Button from '@instructure/ui-core/lib/components/Button';
import XDatePicker from '@instructure/ui-core/lib/components/DatePicker';
import Grid, { GridCol, GridRow } from '@instructure/ui-core/lib/components/Grid';
import Popover, { PopoverContent } from '@instructure/ui-core/lib/components/Popover';
import Text from '@instructure/ui-core/lib/components/Text';
import ScreenReaderContent from '@instructure/ui-core/lib/components/ScreenReaderContent';
import IconArrowOpenLeftLine from 'instructure-icons/lib/Line/IconArrowOpenLeftLine';
import IconArrowOpenRightLine from 'instructure-icons/lib/Line/IconArrowOpenRightLine';
import IconCalendarMonthLine from 'instructure-icons/lib/Line/IconCalendarMonthLine';

const DATE_FORMAT_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

export default class DatePicker extends React.Component {
  constructor (props) {
    super(props);

    this.bindCalendarButton = (ref) => { this.calendarButton = ref };

    this.handleCalendarSelect = (event, date) => {
      const selectedDate = new Date(date);
      this.setState({ selectedDate });
    };

    this.handlePreviousClick = () => {
      const selectedDate = new Date(this.state.selectedDate.getTime());
      selectedDate.setDate(selectedDate.getDate() - 1);
      this.setState({ selectedDate });
    };

    this.handleNextClick = () => {
      const selectedDate = new Date(this.state.selectedDate.getTime());
      selectedDate.setDate(selectedDate.getDate() + 1);
      this.setState({ selectedDate });
    };

    this.showCalendar = () => {
      this.setState({ showCalendar: true });
    };

    this.dismissCalendar = () => {
      this.setState({ showCalendar: false });
    };

    this.state = {
      currentDate: new Date(),
      selectedDate: new Date(),
      showCalendar: false
    };
  }

  render () {
    return (
      <div>
        <Grid>
          <GridRow>
            <GridCol width="auto">
              <Button onClick={this.handlePreviousClick} variant="icon">
                <IconArrowOpenLeftLine />
              </Button>
            </GridCol>

            <GridCol>
              <Text>{ this.state.selectedDate.toLocaleDateString(undefined, DATE_FORMAT_OPTIONS) }</Text>
            </GridCol>

            <GridCol width="auto">
              <Button onClick={this.handleNextClick} variant="icon">
                <IconArrowOpenRightLine />
              </Button>
            </GridCol>

            <GridCol width="auto">
              <Button buttonRef={this.bindCalendarButton} onClick={this.showCalendar} variant="icon">
                <IconCalendarMonthLine />
              </Button>
            </GridCol>
          </GridRow>
        </Grid>

        <Popover
          onToggle={this.dismissCalendar}
          positionTarget={this.calendarButton}
          show={this.state.showCalendar}
        >
          <PopoverContent>
            <XDatePicker
              nextLabel="Next Month"
              onSelectedChange={this.handleCalendarSelect}
              previousLabel="Previous Month"
              selectedValue={this.state.selectedDate.toISOString()}
              todayValue={this.state.currentDate.toISOString()}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  }
}
