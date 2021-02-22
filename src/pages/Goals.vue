<template>
  <q-page class="flex flex-center column ">
    <q-dialog ref="dialog"
              persistent
              :maximized="maximizedToggle"
              transition-show="slide-up"
              transition-hide="slide-down"
              @hide="onDialogHide">
      <q-layout view="Lhh lpR fff" container class="bg-white">
        <q-header class="bg-primary">
          <q-toolbar>

            <q-toolbar-title>Goal</q-toolbar-title>
            <q-btn flat v-close-popup round dense icon="close"/>
          </q-toolbar>
        </q-header>

        <q-footer class="bg-black text-white">
          <q-toolbar inset>
            <q-toolbar-title>Equip</q-toolbar-title>
          </q-toolbar>
        </q-footer>
        <q-page-container>
          <q-page padding>
            <q-card class="q-dialog-plugin__form q-mb-lg">
              <q-form ref="myForm"
                      @submit="onSubmit"
              >
                <q-input
                  filled
                  v-model="goal.title"
                  label="Title "
                  hint="Title of the goal"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Please type something']"
                />
                <q-select filled v-model="category" :options="options" label="Select categories"
                          lazy-rules
                          :rules="[ val => val && val.length > 0 || 'Please select something']"/>
                <q-input
                  filled
                  v-model="goal.age"
                  label="Enter Age"
                />

                <q-input
                  filled
                  v-model="goal.author"
                  label="Author *"

                />

                <q-input
                  filled
                  v-model="goal.introduction"
                  label="Introduction *"

                />
                <q-input
                  filled
                  v-model="goal.image"
                  label="Featured image"
                  hint="enter image url here"
                />

                <q-editor
                  v-model="goal.html"
                  :dense="$q.screen.lt.md"
                  :toolbar="[
        [
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            list: 'only-icons',
            options: ['left', 'center', 'right', 'justify']
          },
          {
            label: $q.lang.editor.align,
            icon: $q.iconSet.editor.align,
            fixedLabel: true,
            options: ['left', 'center', 'right', 'justify']
          }
        ],
        ['bold', 'italic', 'strike', 'underline', 'subscript', 'superscript'],
        ['token', 'hr', 'link', 'custom_btn'],
        ['print', 'fullscreen'],
        [
          {
            label: $q.lang.editor.formatting,
            icon: $q.iconSet.editor.formatting,
            list: 'no-icons',
            options: [
              'p',
              'h1',
              'h2',
              'h3',
              'h4',
              'h5',
              'h6',
              'code'
            ]
          },
          {
            label: $q.lang.editor.fontSize,
            icon: $q.iconSet.editor.fontSize,
            fixedLabel: true,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'size-1',
              'size-2',
              'size-3',
              'size-4',
              'size-5',
              'size-6',
              'size-7'
            ]
          },
          {
            label: $q.lang.editor.defaultFont,
            icon: $q.iconSet.editor.font,
            fixedIcon: true,
            list: 'no-icons',
            options: [
              'default_font',
              'arial',
              'arial_black',
              'comic_sans',
              'courier_new',
              'impact',
              'lucida_grande',
              'times_new_roman',
              'verdana'
            ]
          },
          'removeFormat'
        ],
        ['quote', 'unordered', 'ordered', 'outdent', 'indent'],

        ['undo', 'redo'],
        ['viewsource']
      ]"
                  :fonts="{
        arial: 'Arial',
        arial_black: 'Arial Black',
        comic_sans: 'Comic Sans MS',
        courier_new: 'Courier New',
        impact: 'Impact',
        lucida_grande: 'Lucida Grande',
        times_new_roman: 'Times New Roman',
        verdana: 'Verdana'
      }"
                />
                <q-input
                  filled
                  v-model="goal.material"
                  label="Materials"
                />
                <q-input
                  filled
                  v-model="goal.tools"
                  label="Tools"
                />
                <q-input
                  filled
                  v-model="goal.repeat"
                  label="repeat"
                />
                <q-input
                  filled
                  v-model="goal.series"
                  label="Part of Series"
                />


                <div class="q-mb-xl">
                  <q-btn label="Submit" type="submit" color="primary"/>
                  <q-btn label="Reset" type="reset" color="primary" @click="onReset" flat class="q-ml-sm"/>
                </div>
              </q-form>

              <q-card-actions align="right" >
<!--                <q-btn color="primary" label="OK"/>-->
<!--                <q-btn color="primary" label="Cancel"/>-->
              </q-card-actions>
            </q-card>
          </q-page>
        </q-page-container>
      </q-layout>

    </q-dialog>
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @row-click="rowClick"
    >
      <template v-slot:top>
        <q-btn color="primary" label="Add New Goal" @click="addRow"/>
        <q-space/>

      </template>
    </q-table>

  </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Category',
  data() {
    return {
      model: null,
      category: '',
      goal: {
        title: '',
        category: null,
        author: '',
        introduction: '',
        image: '',
        age: '',
        html: '',
        material: '',
        tools: '',
        repeat: '',
        series: '',
      },
      dialog: false,
      maximizedToggle: true,
      options: [],
      categories: [],
      isActive: true,
      columns: [
        {
          name: 'title',
          required: true,
          label: 'Title',
          align: 'left',
          field: 'title',
          format: val => `${val}`,
          sortable: true
        },
        {name: 'category.name', align: 'center', label: 'Category', field: row => row.category.name, sortable: true},
        {name: 'author', label: 'Author', field: 'author', sortable: true},
        {name: 'introduction', label: 'Introduction', field: 'introduction'},
        // { name: 'featured', label: 'Featured Image', field: 'featured' },
        {name: 'age', label: 'Age', field: 'age'},
        {name: 'material', label: 'Material', field: 'material', sortable: true},
        {name: 'repeat', label: 'Repeat', field: 'repeat', sortable: true},
        {name: 'series', label: 'Part of series', field: 'series', sortable: true}
      ],

      rows: []
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {

      this.$firestore.collection("categories").onSnapshot(docSnapshot => {
        let docs = docSnapshot.docs
        this.categories = [];
        docs.forEach(item => {
          let _data = {
            id: item.data().id,
            name: item.data().name,

          }
          this.categories.push(_data)

        })
        let _cat = this.categories.map(item => item.name)
        this.options = _cat

      })

      //////// get goals ////////
      this.$firestore.collection("goals").onSnapshot(docSnapshot => {
        this.rows = [];
        let docs = docSnapshot.docs
        docs.forEach(item => {
          let _data = item.data();
          debugger
          this.rows.push(_data)

        })

      })
    },
    rowClick(evt, row, index) {
      this.currentId = row.id
      debugger
      this.goal = row
      this.category = row.category.name
      debugger
      this.show()
    },
    show() {
      this.$refs.dialog.show()
    },
    async onSubmit() {
      debugger
      if (this.currentId) {
        this.goal.category = this.categories.find(item => item.name === this.category)
        await this.$firestore.collection("goals").doc(this.currentId).update(this.goal)
        this.goal = {};
        this.currentId = '';
        this.hide()
      } else {
        this.$refs.myForm.validate().then(async success => {
          if (success) {
            debugger
            this.goal.category = this.categories.find(item => item.name === this.category)
            debugger
            // let model={
            //   title:this.title,
            //   category:this.category,
            //   author:this.author,
            //   introduction:this.introduction,
            //   image:this.image,
            //   age:this.age,
            //   html:this.html,
            //   material:this.material,
            //   tools:this.tools,
            //   repeat:this.repeat,
            //   series:this.series,
            //   isActive:true
            // }
            //this.goal.category=this.category;
            let ref = await this.$firestore.collection("goals").add(this.goal)
            this.hide()
            await this.$firestore.collection("goals").doc(ref.id).set({id: ref.id}, {merge: true})
          } else {
            // oh no, user has filled in
            // at least one invalid value
          }
        })
      }
    },
    onReset() {
      this.goal = {}
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      // required to be emitted
      // when QDialog emits "hide" event
      this.currentId='';
      this.$emit('hide')
    },
    addRow() {
      this.goal={}
      this.show()
    }
  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
