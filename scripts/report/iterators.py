from datetime import date, timedelta, datetime, time


class WeekIterator:

    current_date = None

    def __init__(self, weeks=None, start_date=None):
        self.start_date = start_date
        if not self.start_date:
            self.start_date = date.today() - timedelta(weeks=weeks)

        if self.start_date:
            self.start_date -= timedelta(days=self.start_date.weekday())

    def __iter__(self):
        return self

    def __next__(self):
        if not self.current_date:
            self.current_date = self.start_date
        else:
            self.current_date += timedelta(days=7)

        if self.current_date > date.today():
            raise StopIteration()

        return [
            datetime.combine(self.current_date, time(0, 0, 0)),
            datetime.combine(self.current_date +
                             timedelta(days=7), time(0, 0, 0))
        ]
