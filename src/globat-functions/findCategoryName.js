export const catagoryList = [
    { name: "Front End", code: "FE" },
    { name: "Back End", code: "BE" },
    { name: "Database", code: "DB" },
    { name: "Other", code: "Other" },
  ];

  export const findCatagory = (catagoryValue)=>{
    const filterCatagory = catagoryList?.filter((item)=>{
        return item.code === catagoryValue
    })
    return filterCatagory[0]?.name
  }