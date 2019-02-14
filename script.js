// _____ Customize Select _____*
{
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select");
  for (i = 0; i < x.length; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    /*for each element, create a new DIV that will act as the selected item:*/
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /*for each element, create a new DIV that will contain the option list:*/
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < selElmnt.length; j++) {
      /*for each option in the original select element,
      create a new DIV that will act as an option item:*/
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function (e) {
        /*when an item is clicked, update the original select box,
        and the selected item:*/
        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function (e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /*a function that will close all select boxes in the document,
    except the current select box:*/
    var x, y, i, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    for (i = 0; i < y.length; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < x.length; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }
  /*if the user clicks anywhere outside the select box,
  then close all select boxes:*/
  document.addEventListener("click", closeAllSelect);
}
// _____ End Customize Select _____*


const input_from_date = document.querySelector('.input-from')
const input_to_date = document.querySelector('.input-to')
const input_from_date_value = moment(input_from_date.value, "YYYY-MM-DD").format("MMMM DD, YY")
const input_to_date_value = moment(input_to_date.value, "YYYY-MM-DD").format("MMMM DD, YY")

const from_date_val = document.querySelector('.from-date-val')
const to_date_val = document.querySelector('.to-date-val')
const apply = document.querySelector('.apply')
const cancel = document.querySelector('.cancel')
const select_items = document.getElementsByClassName('select-items')
const select_items_to_array = Array.from(select_items)
const select_items_days = select_items_to_array[0]


// _____ Customize Date Input _____*
function customizeDateInput() {
  $('input').on('change', function () {
    this.setAttribute(
      'data-date',
      moment(this.value, 'YYYY-MM-DD')
      .format(this.getAttribute('data-date-format'))
    )
  }).trigger('change')
}

customizeDateInput()

// Set Text To Header
to_date_val.textContent = input_to_date.getAttribute('data-date')
// _____ End Customize Date Input _____*


// Apply Button
apply.addEventListener('click', e => {
  from_date_val.textContent = input_from_date.getAttribute("data-date")
  to_date_val.textContent = input_to_date.getAttribute("data-date")
})

// Cancel Button
cancel.addEventListener('click', e => {
  from_date_val.textContent = input_from_date_value
  to_date_val.textContent = input_to_date_value
  //  customizeDateInput()
})

// _____ Last Days Select _____*


function lastDays(mls) {
  let days = mls

  let toDate = +new Date(input_to_date.value)
  let difference = toDate - days
  let diffDate = new Date(difference)
  let resDate = `${diffDate.getFullYear()}-${diffDate.getUTCMonth() + 1}-${diffDate.getUTCDate()}`

  return resDate
}

function setDataDate(lastDays, mls) {
  var days = lastDays(mls)
  return $('.input-from').on('change', function () {
    this.setAttribute(
      'data-date',
      moment(days, 'YYYY-MM-DD')
      .format(this.getAttribute('data-date-format'))
    )
  }).trigger('change')
}

select_items_days.addEventListener('click', e => {
  switch (e.target.textContent) {
    case 'Today':
      setDataDate(lastDays, 0)
      break;
    case 'Last 7 days':
      setDataDate(lastDays, 604800000)
      break;
    case 'Last 30 days':
      setDataDate(lastDays, 2494800000)
      break;
    case 'Last 90 days':
      setDataDate(lastDays, 7484400000)
      break;
    default:
      setDataDate(lastDays, 0)
  }
})

select_items_to_array[0].childNodes[2].click()

var inpFrom = document.querySelector('.input-from')
inpFrom.addEventListener('input', function (e) {
  select_items_to_array[0].childNodes[0].click()
  customizeDateInput()
})

from_date_val.textContent = input_from_date.getAttribute('data-date')
// _____ End Last Days Select _____*
