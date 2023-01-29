import format from "date-fns/format";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import getSeconds from "date-fns/getSeconds";
import { Component, createEffect, createSignal, onCleanup } from "solid-js";

const Clock: Component = () => {
  const [time, setTime] = createSignal(new Date());
  let intervalRef: number = -1;

  createEffect(() => {
    if (intervalRef === -1) {
      intervalRef = setInterval(() => {
        setTime(new Date());
      }, 1000);
    }

    onCleanup(() => {
      if (intervalRef !== -1) {
        clearInterval(intervalRef);
        intervalRef = -1;
      }
    });
  });

  return (
    <div class="h-full w-full top-0 left-0 p-12 bg-gray-900 fixed text-white flex items-center justify-center">
      <div class="flex items-end">
        <h1 class="text-9xl font-bold text-right" style={{ width: "450px" }}>
          {format(time(), "h:mm")}
        </h1>
        <p class="mb-3 text-xl font-black" style={{ width: "190px" }}>
          {format(time(), "ss")}
        </p>
      </div>
    </div>
  );
};

export default Clock;
