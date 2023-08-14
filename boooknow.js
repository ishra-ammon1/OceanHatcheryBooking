document.addEventListener("DOMContentLoaded", function () {
    const charges = {
        slAdult: { normal: 4, peak: 6 },
        slChild: { normal: 2, peak: 3 },
        foreignerAdult: { normal: 10, peak: 13 },
        foreignerChild: { normal: 5, peak: 8 },
    };

    const incrementButtons = document.querySelectorAll(".increment");
    const decrementButtons = document.querySelectorAll(".decrement");

    let durationText = "1 hr";

    function calculateTotalPayable(selectedTimeSlots, isPeakHour, ticketQuantities) {
        let totalPayable = 0;

        selectedTimeSlots.forEach(timeSlot => {
            const chargeMultiplier = isPeakHour ? 'peak' : 'normal';
            Object.keys(ticketQuantities).forEach(ticketType => {
                totalPayable += ticketQuantities[ticketType] * charges[ticketType][chargeMultiplier];
            });
        });

        return totalPayable;
    }

    function updateSummary() {
        const visitDate = document.getElementById("date").value;
        const selectedTimeSlots = Array.from(document.getElementById("timeSlot").selectedOptions).map(option => option.value);
        const isPeakHour = selectedTimeSlots.some(timeSlot => timeSlot.includes("10.00 am - 11.00 am") || timeSlot.includes("05.00 pm - 06.00 pm"));

        const areTimeSlotsConsecutive = areConsecutive(selectedTimeSlots);

        const summaryDateCell = document.getElementById("summaryDate");
        const summaryTimeCell = document.getElementById("summaryTime");
        const summaryDurationCell = document.getElementById("summaryDuration");
        const summaryTicketsCell = document.getElementById("summaryTickets");
        const summaryTotalCell = document.getElementById("summaryTotal");

        summaryDateCell.textContent = visitDate;
        summaryTimeCell.textContent = areTimeSlotsConsecutive ? selectedTimeSlots.join(", ") : "Non-consecutive time slots selected";

        if (areTimeSlotsConsecutive) {
            const selectedTimeSlotCount = selectedTimeSlots.length;
            durationText = selectedTimeSlotCount > 1 ? `${selectedTimeSlotCount} hrs` : "1 hr";
            summaryDurationCell.textContent = `${durationText} (${isPeakHour ? "Peak" : "Normal"})`;
        } else {
            durationText = "Non-consecutive time slots selected";
            summaryDurationCell.textContent = durationText;
            document.getElementById("timeSlot").selectedIndex = -1;
        }

        const ticketQuantities = {
            slAdult: parseInt(document.getElementById("slAdult").value) || 0,
            slChild: parseInt(document.getElementById("slChild").value) || 0,
            foreignerAdult: parseInt(document.getElementById("foreignerAdult").value) || 0,
            foreignerChild: parseInt(document.getElementById("foreignerChild").value) || 0,
            infant: parseInt(document.getElementById("infant").value) || 0,
        };


        let ticketsSummaryHTML = "";
        let totalPayable = 0;
        Object.keys(ticketQuantities).forEach(ticketType => {
            const chargeMultiplier = isPeakHour ? 'peak' : 'normal';
            const ticketQuantity = ticketQuantities[ticketType];
            const ticketCharge = ticketQuantity * charges[ticketType][chargeMultiplier];
            if (ticketQuantity > 0) {
                ticketsSummaryHTML += `${ticketQuantity} ${ticketType} $${ticketCharge.toFixed(2)}<br>`;
            }
            totalPayable += ticketCharge;
        });
        summaryTicketsCell.innerHTML = ticketsSummaryHTML || "No tickets selected";

        summaryTotalCell.textContent = `$${totalPayable.toFixed(2)}`;

        const continueButton = document.getElementById("continueBut");
        continueButton.disabled = totalPayable <= 0;

        const ticketDetails = [];
        Object.keys(ticketQuantities).forEach(ticketType => {
            if (ticketQuantities[ticketType] > 0) {
                const chargeMultiplier = isPeakHour ? 'peak' : 'normal';
                const ticketCharge = ticketQuantities[ticketType] * charges[ticketType][chargeMultiplier];
                ticketDetails.push({
                    type: ticketType,
                    quantity: ticketQuantities[ticketType],
                    charge: ticketCharge.toFixed(2)
                });
            }
        });
        localStorage.setItem("ticketDetails", JSON.stringify(ticketDetails));
    }

    incrementButtons.forEach(button => {
        button.addEventListener("click", handleIncrement);
    });

    decrementButtons.forEach(button => {
        button.addEventListener("click", handleDecrement);
    });

    function handleIncrement(event) {
        event.preventDefault();
        const inputElement = event.target.parentElement.querySelector("input");
        inputElement.value = parseInt(inputElement.value) + 1;
        updateSummary();
    }

    function handleDecrement(event) {
        event.preventDefault();
        const inputElement = event.target.parentElement.querySelector("input");
        const currentValue = parseInt(inputElement.value);
        inputElement.value = currentValue > 0 ? currentValue - 1 : 0;
        updateSummary();
    }

    function areConsecutive(timeSlots) {
        if (timeSlots.length <= 1) {
            return true;
        }

        const timeSlotValues = timeSlots.map(slot => parseInt(slot.split('-')[0]));
        const sortedTimeSlots = [...timeSlotValues].sort((a, b) => a - b);
        for (let i = 1; i < sortedTimeSlots.length; i++) {
            if (sortedTimeSlots[i] !== sortedTimeSlots[i - 1] + 1) {
                return false;
            }
        }
        return true;
    }

    const currentDate = new Date().toISOString().split('T')[0];
    document.getElementById("date").value = currentDate;
    const firstTimeSlotOption = document.getElementById("timeSlot").options[0];
    firstTimeSlotOption.selected = true;
    updateSummary();
});


document.addEventListener('DOMContentLoaded', function () {
    const dateInput = document.getElementById('date');
    const slAdultInput = document.getElementById('slAdult');
    const slChildInput = document.getElementById('slChild');
    const foreignerAdultInput = document.getElementById('ForeingerAdult');
    const foreignerChildInput = document.getElementById('ForeingerChild');
    const infantInput = document.getElementById('Infant');
    const timeSlotSelect = document.getElementById('timeSlot');
    const summaryDate = document.getElementById('summaryDate');
    const summaryTime = document.getElementById('summaryTime');
    const summaryDuration = document.getElementById('summaryDuration');
    const summaryTickets = document.getElementById('summaryTickets');
    const summaryTotal = document.getElementById('summaryTotal');
    const continueButton = document.getElementById('continueBut');

    continueButton.addEventListener('click', function (event) {
        event.preventDefault(); 

     
        const selectedDate = dateInput.value;
        const selectedTimeSlot = timeSlotSelect.value;
        const slAdultCount = parseInt(slAdultInput.value);
        const slChildCount = parseInt(slChildInput.value);
        const foreignerAdultCount = parseInt(foreignerAdultInput.value);
        const foreignerChildCount = parseInt(foreignerChildInput.value);
        const infantCount = parseInt(infantInput.value);

       
        const totalTickets = slAdultCount + slChildCount + foreignerAdultCount + foreignerChildCount + infantCount;
        const totalAmount = (slAdultCount * 4) + (slChildCount * 2) + (foreignerAdultCount * 10) + (foreignerChildCount * 5);

        
        summaryDate.textContent = selectedDate;
        summaryTime.textContent = selectedTimeSlot;
        summaryDuration.textContent = "1 hour"; 
        summaryTickets.textContent = totalTickets;
        summaryTotal.textContent = `$${totalAmount}`;

       
    });
});
