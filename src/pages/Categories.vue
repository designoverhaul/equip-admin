<template>
  <q-page class="flex flex-center column">

    <q-card class="my-card">

      <q-card-section>
        <div class="text-h6">Enter Category Name</div>
        <div class="text-subtitle2">
          <q-input v-model="category"></q-input>
        </div>
        <div class="text-subtitle2 q-mt-md">
          <q-btn @click="saveCategory">Save</q-btn>
        </div>
      </q-card-section>
    </q-card>
    <q-table
      title="Categories"
      class="q-mt-md"
      :rows="datatable"
      row-key="name"
      @row-click="rowClick"
    />

  </q-page>
</template>

<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'Category',
  data() {
    return {
      category: '',
      currentId: '',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true},
        {name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true},
        {name: 'carbs', label: 'Carbs (g)', field: 'carbs'},
        {name: 'protein', label: 'Protein (g)', field: 'protein'},
        {name: 'sodium', label: 'Sodium (mg)', field: 'sodium'},
        {
          name: 'calcium',
          label: 'Calcium (%)',
          field: 'calcium',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        },
        {
          name: 'iron',
          label: 'Iron (%)',
          field: 'iron',
          sortable: true,
          sort: (a, b) => parseInt(a, 10) - parseInt(b, 10)
        }
      ],

      datatable: [],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    async saveCategory() {
      if (this.currentId) {
        await this.$firestore.collection("categories").doc(this.currentId).update({name: this.category})
        this.category = '';
        this.currentId = '';
      } else {
        if (this.category) {
          let isExist = await this.$firestore.collection("categories")
            .where("name", "==", this.category).get()
          if (isExist.docs.length === 0) {
            let refid = await this.$firestore.collection("categories").add(
              {
                name: this.category,
                icon: '',
                isActive: true
              }, {merge: true}
            )
            await this.$firestore.collection("categories").doc(refid.id).set({
              id: refid.id
            }, {merge: true})
            this.category = ''

          } else {
            alert("Already exists")
            this.category = ''
          }
        }
      }
    },
    getData() {

      this.$firestore.collection("categories").onSnapshot(docSnapshot => {
        this.datatable = [];
        let docs = docSnapshot.docs
        docs.forEach(item => {

          let _data = {
            id: item.data().id,
            name: item.data().name,

          }

          this.datatable.push(_data)
        })


        console.log(this.datatable)
      })
    },
    rowClick(evt, row, index) {
      this.currentId = row.id
      this.category = row.name

    }

  }
})
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 500px
</style>
