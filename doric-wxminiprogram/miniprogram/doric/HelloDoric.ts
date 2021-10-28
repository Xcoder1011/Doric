import {
  image,
  text,
  Gravity,
  Color,
  vlayout,
  layoutConfig,
  Panel,
  Group,
  Text,
} from "doric";

export class HelloDoric extends Panel {
  build(root: Group) {
    let count = 0;
    let tv: Text
    vlayout(
      [
        image({
          imageUrl: "https://doric.pub/logo.png",
          onClick: () => {
            tv.text = `${++count}`
          }
        }),
        tv = text({
          text: `${count}`,
          textSize: 20,
        }),
      ],
      {
        layoutConfig: layoutConfig().most().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      }
    ).in(root);
  }
}