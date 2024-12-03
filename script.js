
document.addEventListener('DOMContentLoaded', () => {
    let checkedItemLeft = []
    let checkedItemRight = []

    let leftSwift = document.getElementById('leftSwift');
    let rightSwift = document.getElementById('rightSwift');

    leftSwift.disabled = true
    rightSwift.disabled = true

    const leftContent = document.getElementById('left');
    const rightContent = document.getElementById('right');

    const allRightSwiftBtn = document.getElementById('allRightSwift');
    const allLeftSwiftBtn = document.getElementById('allLeftSwift');

    // Moving entire content
    allRightSwiftBtn.addEventListener('click', () => {
        moveAllItems(leftContent, rightContent);
        allRightSwiftBtn.disabled = true
        allLeftSwiftBtn.disabled = false
        checkedItemRight = [...checkedItemRight, ...checkedItemLeft]
        checkedItemLeft = []
        rightSwift.disabled = true
        if (checkedItemRight.length > 0) {
            leftSwift.disabled = false
        }
        console.log(checkedItemLeft, checkedItemRight, "down")
    });

    allLeftSwiftBtn.addEventListener('click', () => {
        moveAllItems(rightContent, leftContent);
        allLeftSwiftBtn.disabled = true
        allRightSwiftBtn.disabled = false
        checkedItemLeft = [...checkedItemLeft, ...checkedItemRight]
        checkedItemRight = []
        leftSwift.disabled = true
        if (checkedItemLeft.length > 0) {
            rightSwift.disabled = false
        }
        console.log(checkedItemLeft, checkedItemRight, "up")
    });


    function moveAllItems(fromContainer, toContainer) {

        while (fromContainer.firstChild) {
            // console.log(fromContainer.firstChild);

            toContainer.appendChild(fromContainer.firstChild)
        }
    }

    //  Adding item one by one based on target
    document.addEventListener('change', (event) => {
        if (event.target.classList.contains('item')) {
            // console.log(event.target);
            // console.log(event.target.checked);
        }

        // Adding checked items to respective array
        if (event.target.classList.contains('item') && event.target.closest('#left')) {
            if (event.target.checked) {
                rightSwift.disabled = false
                checkedItemLeft.push(event.target.closest('div'));
                // console.log(checkedItemLeft)
            } else {
                let index = checkedItemLeft.indexOf(event.target.closest('div'));
                checkedItemLeft.splice(index, 1)
            }
        } else if (event.target.classList.contains('item') && event.target.closest('#right')) {
            if (event.target.checked) {
                leftSwift.disabled = false
                checkedItemRight.push(event.target.closest('div'));
                // console.log(checkedItemRight)
            } else {
                let index = checkedItemRight.indexOf(event.target.closest('div'));
                checkedItemRight.splice(index, 1)
            }
        }

        // updating buttons based on checked
        if (checkedItemLeft.length > 0) {
            rightSwift.disabled = false
        } else {
            rightSwift.disabled = true
        }
        if (checkedItemRight.length > 0) {
            leftSwift.disabled = false
        } else {
            leftSwift.disabled = true
        }

    })


    rightSwift.addEventListener('click', () => {
        checkedItemLeft.forEach((item) => {
            item.querySelector('input').checked = false
            rightContent.appendChild(item)

        })
        checkedItemLeft = []
        rightSwift.disabled = true
        allRightSwiftBtn.disabled = false
        allLeftSwiftBtn.disabled = false

        let leftContainer = document.getElementById('left')
        // console.log(leftContainer.childNodes)
        // console.log(leftContainer.childNodes.length)
        if (leftContainer.childNodes.length === 0) {
            allRightSwiftBtn.disabled = true
        }
    })

    leftSwift.addEventListener('click', () => {
        checkedItemRight.forEach((item) => {
            item.querySelector('input').checked = false
            leftContent.appendChild(item)

        })
        checkedItemRight = []
        leftSwift.disabled = true
        allRightSwiftBtn.disabled = false
        allLeftSwiftBtn.disabled = false
        
        let rightContainer = document.getElementById('right')
        if (rightContainer.childNodes.length === 0) {
            allLeftSwiftBtn.disabled = true
        }

    })

});
