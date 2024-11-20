import React from 'react'

const Jobs = ({result}) => {
  console.log("---------> ",result)
  return (
    <>
    <div className="">
      <h3 className="text-lg font-bold mb-2">{result.length} Jobs</h3>
    </div>
    <section className="">{result}</section>
    </>
  )
}

export default Jobs