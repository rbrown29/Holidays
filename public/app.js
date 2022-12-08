const app = angular.module('HolidaysApp', [])

app.controller('MainController', ['$http', function ($http) {
  this.h5 = 'Holiays! Celebrate!'
  this.createForm = {}
  this.holiday = ''

  this.chooseOneHoliday = (holiday) => {
    this.holiday = holiday
    console.log(this.holiday.name)
  }

  this.createHoliday = () => {
    $http({
      method: 'POST',
      url: '/holidays',
      data: this.createForm
    }).then(response => {
      this.createForm = {}
      this.holidays.unshift(response.data)
    }, error => {
      console.log(error)
    })
  }

  this.getHolidays = () => {
    $http({
      method: 'GET',
      url: '/holidays'
    }).then(response => {
      this.holidays = response.data
      this.holiday = this.holidays[0]
    }, error => {
      console.log(error)
    })
  }

  this.deleteHoliday = (id) => {
    // console.log("I'm going to delete you", id)
    $http({
      method: 'DELETE',
      url: '/holidays/' + id
    }).then(response => {
      const removeByIndex = this.holidays.findIndex(holiday => holiday._id === id)
      this.holidays.splice(removeByIndex, 1)

    }, error => {
      console.log(error)
    })
  }
  this.updateCelebrated = (holiday) => {
    holiday.celebrated = !holiday.celebrated
    $http({
      method: 'PUT',
      url: '/holidays/' + holiday._id,
      data: { celebrated: holiday.celebrated }
    }).then(response => {
      console.log(response.data.celebrated)
    }, error => {
      console.log(error)
    })

  }
  // load holidays on page load
  this.getHolidays()
}])