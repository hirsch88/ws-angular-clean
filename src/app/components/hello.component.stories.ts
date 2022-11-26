import { Story, Meta } from '@storybook/angular/types-6-0'
import { HelloComponent } from './hello.component'

// More on default export: https://storybook.js.org/docs/angular/writing-stories/introduction#default-export
export default {
  title: 'Components/HelloComponent',
  component: HelloComponent,
} as Meta

// More on component templates: https://storybook.js.org/docs/angular/writing-stories/introduction#using-args
const Template: Story<HelloComponent> = (args: HelloComponent) => ({
  props: args,
})

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/angular/writing-stories/args
Primary.args = {}
