import {
  image,
  text,
  Gravity,
  Color,
  vlayout,
  layoutConfig,
  Panel,
  Group,
  hlayout,
} from "doric";

export class HelloDoric extends Panel {
  build(root: Group) {
    vlayout(
      [
        image({
          imageUrl: "https://doric.pub/logo.png",
          layoutConfig:layoutConfig().just(),
          width:200,
          height:200,
        }),
        text({
          text: "Hello,    Doric",
          layoutConfig:layoutConfig().just(),
          width:50,
          backgroundColor:Color.YELLOW,
          height:50,
          textSize: 12,
          textColor: Color.RED,
        }),
        text({
          text: "Hello,Doric",
          textSize: 16,
          textColor: Color.BLUE,
        }),
        text({
          text: "Hello,Doric",
          textSize: 20,
          textColor: Color.GREEN,
        }),
        hlayout([],{
          layoutConfig:layoutConfig().just(),
          width:200,
          height:50,
          backgroundColor:Color.RED
        })
      ],
      {
        layoutConfig: layoutConfig().fit().configAlignment(Gravity.Center),
        space: 20,
        gravity: Gravity.Center,
      }
    ).in(root);
  }
}