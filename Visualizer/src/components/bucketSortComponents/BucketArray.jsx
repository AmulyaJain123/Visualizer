import Bucket from "./Bucket";

export default function BucketArray({
  arr,
  marking,
  activeBucket,
  successInd,
}) {
  return (
    <div className="flex space-x-2 mb-16 min-h-[150px]">
      {arr.map((i, index) => {
        return (
          <Bucket
            array={i}
            ind={index}
            active={index === activeBucket}
            low={marking[index].low}
            high={marking[index].high}
            success={successInd.includes(index)}
          />
        );
      })}
    </div>
  );
}
