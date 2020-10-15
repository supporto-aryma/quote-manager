const params = new URL(document.location).searchParams;
var host = new URL(document.location).host;
console.log(host);
if (host == "localhost") {
  host = "stile.condivision.cloud";
}
const menuId = params.get("menuId");
const eventoId = params.get("eventoId");
// var pdf = new jsPDF('p', 'pt', 'a4');
console.log("eventoId", eventoId);
console.log("Host", host);

const eventBus = new Vue();
let peopleNumber = null;
let ppaxPlaceholder = null;
let addingItem = false;
displayDetails = null;

let $food,
  $beverage,
  $stewarding,
  // $products,
  $staff,
  $vehicles,
  $item,
  $prezzo,
  $add,
  $added,
  $search,
  $totalItems,
  $total,
  $option,
  $modify,
  $discount,
  $remove,
  $save,
  $noAdded,
  $hours,
  $removeQ,
  $yes,
  $no,
  $none,
  $quantity,
  $price,
  $print;

$food = "Food";
$beverage = "Beverage";
$stewarding = "Stewarding";
// $products = 'Products'
$staff = "Staff";
$vehicles = "Vehicles";
$item = "Item";
$price = "Price";
$quantity = "Quantity";
$add = "Add";
$added = "Added!";
$search = "Search";
$totalItems = "Total items";
$total = "Total";
$option = "Option";
$modify = "Modify";
$discount = "Discount";
$remove = "Delete";
$save = "Save Changes";
$noAdded = "There are no items added";
$hours = "Hours";
$removeQ = "Do you want to remove";
$yes = "Yes";
$no = "No";
$none = "None";
$print = "Print";
$people = "People";

if (userLang === "it-IT" || userLang === "it") {
  $food = "Cibo";
  $beverage = "Bevande";
  // $stewarding = "Stewarding";
  $stewarding = "Prodotti";
  // $products = 'Prodotti'
  $staff = "Staff";
  $vehicles = "Veicoli";
  $item = "Articolo";
  $price = "Prezzo";
  $quantity = "Quantità";
  $add = "Inserisci";
  $added = "Inserito!";
  $search = "Ricerca";
  $totalItems = "Totale articoli";
  $total = "Totale";
  $option = "Note";
  $modify = "Modificare";
  $discount = "Sconto";
  $remove = "Elimina";
  $save = "Salva";
  $noAdded = "Non ci sono articoli aggiunti";
  $hours = "Ore";
  $removeQ = "Vuoi rimuovere";
  $yes = "Sì";
  $no = "No";
  $none = "Nessuna";
  $print = "Stampa";
  $people = "Persone";
}

function decodeHTML(html) {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// MAIN COMPONENT
Vue.component("content-container", {
  data() {
    return {
      displayDetails: null,
      infoEvento: "",
      printModal: false,
      printSrc: "",
      currency: "€",
      show: false,
      totalAll: 0,
      totalAllCache: 0,
      title: "",
      date: "",
      menuId: null,
      eventoId: null,
      people: 0,
      staff: false,
      selectedInstance: "",
      instancesOpened: [],
      iFrameModalActive: false,
      instances: [
        {
          id: "91488f20-8751-4dfd-8a58-0ca6187ca690",
          name: $food,
          type: "Two-Level",
          icon: "fa-lemon",
          show: false,
          categories: [],
          total: 0
        },
        {
          id: "b4b1cebb-4e15-4d19-99cb-945af47a5986",
          name: $beverage,
          type: "Two-Level",
          icon: "fa-coffee",
          show: false,
          categories: [],
          total: 0
        },
        {
          id: "7d8d2889-deaf-45fc-8800-be0395a11b67",
          name: $stewarding,
          type: "Two-Level",
          icon: "fa-utensils",
          total: 0,
          show: true,
          categories: []
        },
        // {
        //   id: '7d8d2889-deaf-45fc-8800-be0393411b67',
        //   name: $products,
        //   type: 'Two-Level',
        //   icon: 'fa-utensils',
        //   total: 0,
        //   show: true,
        //   categories: [],
        // },
        {
          id: "9b3c9421-4ab6-4c4e-91d7-aae8d83f72b9",
          name: $staff,
          type: "Two-Level",
          icon: "fa-address-card",
          show: false,
          categories: [],
          total: 0
        },
        {
          id: "b3efc29c-76cf-4d23-b712-6696186592b0",
          name: $vehicles,
          type: "Two-Level",
          icon: "fa-truck",
          show: false,
          categories: [],
          total: 0
        }
      ]
    };
  },
  template: `
		<div class="app container">
			<div class="level">
				<div class="">
          <h1 class="title" style="margin-bottom: 0;">{{ title }}</h1>
          <small v-html="decodeHTML(infoEvento)"></small>
          <div>
            <small>{{ date }} | ${$people}: {{people}}</small> | <small><a style="color: #363636;" @click="iFrameModalActive = true">
            <span class="icon is-small">
              <i class="fa fa-clipboard" />
            </span>
            Riepilogo
            </a>
            </small>
            |
            <small>
            <a style="color: #363636;" :href="'/v2/mod_menu_portate/mod_stampa.php?menuId=' + menuId" target="__blank">
              <span class="icon is-small">
                <i class="fa fa-print" />
              </span>
              Stampa
            </a>
            </small>
            </small>
          </div>
          <div class="modal" :class="{'is-active': iFrameModalActive}">
            <div class="modal-background" @click="iFrameModalActive = false"></div>
            <div class="modal-content" style="width:950px; overflow: hidden;">
              <div class="card">
                <div class="card-content">
                  <embed v-if="iFrameModalActive" width="900px" height="500px" :src="embedSrc">
                </div>
              </div>
            </div>
            <button @click="iFrameModalActive = false" class="modal-close is-large" aria-label="close"></button>
          </div>
				</div>
        <h1 class="title level-right">
          <span :class="{ 'hide-for-client': showDetails == false }">${$total}: {{ totalAll.toFixed(2) }}€</span>
        </h1>
			</div>
			<div class="instance-picker tabs is-centered">
				<ul>
					<li v-for="instance in instances" :title="instance.name" :class="{'is-active':selectedInstance === instance.name}" :key="instance.id" @click="showInstance(instance)">
						<a>
							<span class="icon is-small"><i class="fas is-large" :class="instance.icon" aria-hidden="true"></i></span>
							<span class="instance-name">{{ instance.name }}</span>
						</a>
					</li>
				</ul>
			</div>
			
				<instance 
					v-for="instance in instances"
					v-show="instance.show" 
					:instance.sync="instance" 
					:currency="currency" 
					:staff="staff" 
          :key="instance.id"
          :displayTotal="displayDetails"
					@total-update="updateTotal"
				></instance>
			
			<a class="button" style="display:none" @click="printToggle">${$print}</a>
			<div class="modal" :class="{'is-active':printModal}">
				<div class="modal-background"></div>
				<div id="print-modal" class="modal-content">
					<!-- Any other Bulma elements you want -->
					<iframe id="printEmbed" style="height:800px;width: 100%;" :src="printSrc">
					</iframe>
				</div>
				<button class="modal-close is-large" aria-label="close" @click="printToggle"></button>
			</div>
			<div id="print-here" ></div>
		</div>
  `,
  computed: {
    embedSrc() {
      return `https://${location.hostname}/v2/mod_menu_portate/mod_configuratore.php?eventoName=${this.title}&preview&evento_id=${this.eventoId}&menuId=${this.menuId}`;
    },
    showDetails() {
      if (this.displayDetails == '0') {
        return false
      }
      return true;
    },
  },
  methods: {
    decodeHTML(html) {
      var txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    },
    updateData(type, newitem) {
      this.instances.forEach(instance => {
        if (instance.type === "Two-Level") {
          instance.categories.forEach(category => {
            category.total = 0;
            let subCategoryTotal = 0;
            category.subcatsList.forEach(subCategory => {
              subCategory.total = 0;
              let itemTotal = 0;
              subCategory.items.forEach(item => {
                if (type === "-" && item.id === newitem.id) {
                  item.qty ? (item.qty = 0) : (item.qty = 0);
                }
                itemTotal += item.valore
                  ? item.valore * item.qty
                  : item.qty * item.ultimo_prezzo;
              });
              subCategory.total = itemTotal;
              subCategoryTotal += subCategory.total;
            });
            category.total = subCategoryTotal;
          });
        }
      });
    },
    updateTotal(instanceData) {
      let total = 0;
      if (!instanceData) {
        this.instances.forEach(instance => {
          total += instance.total;
        });
        this.totalAll = total;
      } else {
        this.instances.forEach(instance => {
          if (instance.id == instanceData.id) {
            instance.total = instanceData.total;
          }
          total += instance.total;
        });
        this.totalAll = total;
      }
    },
    printToggle() {
      if (this.printModal === true) {
        this.printModal = false;
      } else {
        this.printDoc();
        this.printModal = true;
      }
    },
    printDoc() {
      var pdf = new jsPDF("p", "pt", "a4");

      let yPos = pdf.autoTable.previous.finalY;
      let total = 0;
      let addedItemArr = Array();
      this.instances.forEach((instance, instanceIndex) => {
        // this.instances.forEach((instance, index) => {
        // this.fetchCategories(instance.name, instanceIndex);
        // });

        console.log("instance", instance);
        if (instance.categories.length > 0) {
          instance.categories.forEach(category => {
            if (category.subcatsList.length > 0) {
              category.subcatsList.forEach(subCat => {
                if (subCat.addedItems.length > 0) {
                  subCat.addedItems.forEach((addedItem, index) => {
                    addedItemArr.push(addedItem);
                  });
                }
              });
            }
          });
        }
        console.log("addedItemArr", addedItemArr);
        let columns2;
        if (addedItemArr.length > 0) {
          addedItemArr.forEach(obj => {
            if (obj.moltiplicatore) {
            }
          });
          if (addedItemArr[0].moltiplicatore) {
            columns2 = [$item, $quantity, $hours, $price, $option, $total];
          } else {
            columns2 = [$item, $quantity, $price, $option, $total];
          }
          let rows2 = [];
          addedItemArr.forEach(item => {
            console.log("item", item);
            let itemTotal;
            if (item.moltiplicatore) {
              itemTotal =
                Number(item.valore) *
                Number(item.moltiplicatore) *
                Number(item.qty).toFixed(2);
            } else {
              itemTotal = (Number(item.valore) * Number(item.qty)).toFixed(2);
            }

            total += Number(itemTotal);
            if (item.note.includes("undefined")) {
              item.note = "";
            }

            if (item.moltiplicatore) {
              rows2.push([
                item.descrizione ? item.descrizione : item.name,
                item.qty,
                item.moltiplicatore,
                Number(item.valore).toFixed(2),
                item.note,
                itemTotal + " EUR"
              ]);
            } else {
              rows2.push([
                item.descrizione ? item.descrizione : item.name,
                item.qty,
                Number(item.valore).toFixed(2),
                item.note,
                itemTotal + " EUR"
              ]);
            }
            // rows2.push([item.descrizione ? item.descrizione : item.name, item.qty, Number(item.valore).toFixed(2), item.note, itemTotal + ' EUR']);
          });
          // console.log('rows', rows)
          pdf.text(
            instance.name,
            20,
            pdf.autoTable.previous.finalY
              ? pdf.autoTable.previous.finalY + 40
              : 40
          );
          // pdf.text(7, 15, instance.name);
          pdf.autoTable(columns2, rows2, {
            headerStyles: {
              fillColor: [153, 132, 106],
              fontSize: 12
            },
            styles: {
              // cellPadding: 5, // a number, array or object (see margin below)
              // fontSize: 10,
              // font: "helvetica", // helvetica, times, courier
              // lineColor: 200,
              // lineWidth: 0,
              // fontStyle: 'normal', // normal, bold, italic, bolditalic
              // overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
              // fillColor: 96, // false for transparent or a color as described below
              // textColor: 20,
              halign: "left", // left, center, right
              valign: "middle", // top, middle, bottom
              columnWidth: "auto" // 'auto', 'wrap' or a number
            },
            startY: pdf.autoTable.previous.finalY
              ? pdf.autoTable.previous.finalY + 60
              : 60,
            margin: { horizontal: 20 }
          });
        }
        addedItemArr = [];
      });
      var totalHeader = [
        {
          title: "TOTAL",
          dataKey: "total"
        },
        {
          title: "Value",
          dataKey: "value"
        }
      ];
      var totalRow = [
        {
          total: "TOTAL",
          value: `${total.toFixed(2) + " EUR"}`
        }
      ];
      pdf.autoTable(totalHeader, totalRow, {
        startY: 770,
        showHeader: "never",
        columnStyles: {
          total: {
            fillColor: [153, 132, 106],
            textColor: 255,
            fontStyle: "bold",
            fontSize: 12,
            halign: "center"
          },
          value: {
            fontSize: 12,
            halign: "center",
            fontStyle: "bold"
          }
        },
        margin: { horizontal: 20 }
      });

      // pdf.setFontSize(20);
      // pdf.text(`${$total.toUpperCase()}`, 20, 820);
      // pdf.text(`${total.toFixed(2) + ' EUR'}`, 400, 820);
      this.printSrc = pdf.output("dataurlstring");
      pdf.autoTable.previous.finalY = 0;
    },
    showInstance(clickedInstance) {
      this.instances.forEach((instance, index) => {
        if (instance.id === clickedInstance.id) {
          this.selectedInstance = instance.name;
          instance.show = true;

          if (this.selectedInstance === $staff) {
            this.staff = true;
          } else {
            this.staff = false;
          }
          this.fetchCategories(this.selectedInstance, index);
        } else {
          instance.show = false;
        }
      });
    },
    fetchCategories(instance, index) {
      let instanceParameter;
      var isCars = false;

      if (instance === $food) {
        instanceParameter = "get_food";
      }

      if (instance === $beverage) {
        instanceParameter = "get_beverage";
      }

      if (instance === $stewarding) {
        instanceParameter = "get_stewarding";
      }

      // if (instance === $products) {
      //   instanceParameter = 'get_products'
      // }

      if (instance === $staff) {
        instanceParameter = "get_staff";
      }

      if (instance === $vehicles) {
        instanceParameter = "get_veichels";
        isCars = true;
      }

      axios
        .get(
          `https://${host}/fl_api/v2.0/?${instanceParameter}&token=1&menuId=${menuId}&eventoId=${eventoId}`
        )
        .then(response => {
          // handle success
          if (!response.data.dati) {
            const error = {
              message: instance + " empty"
            };
            throw error;
          }
          this.instances[index].categories = [];
          if (response.data.dati.length > 1) {
            response.data.dati.forEach(data => {
              this.instances[index].categories.push(data);
            });
          } else {
            this.instances[index].categories.push(response.data.dati[0]);
          }
          // console.log("Data fetched, response:", response.data.dati);
          if (isCars) {
            console.log("vehicel", response.data);
          }
          console.log("Categories:", this.instances[index].categories);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    }
  },
  mounted() {
    this.selectedInstance = $food;
    let foodInstance;
    this.instances.forEach((instance, index) => {
      if (instance.name === $food) {
        foodInstance = instance;
      } else {
        this.fetchCategories(instance.name, index);
      }
    });
    this.showInstance(foodInstance);
    this.updateTotal();
    this.totalAllCache = this.totalAll;

    axios
      .get(
        `https://${host}/fl_api/v2.0/?get_quote_details&token=1&menuId=${menuId}`
      )
      .then(response => {
        if (response.data.dati[0].display_details) {
          this.displayDetails = response.data.dati[0].display_details;
          displayDetails = response.data.dati[0].display_details;
        }
        if (response.data.dati[0].info_evento) {
          this.infoEvento = response.data.dati[0].info_evento;
        }
        this.title = response.data.dati[0].descrizione_menu;
        this.people = response.data.dati[0].numero_persone;
        this.menuId = response.data.dati[0].id;
        this.eventoId = response.data.dati[0].evento_id;
        if (!response.data.dati[0].modalita_quotazione) {
          peopleNumber = 1;
        } else if (response.data.dati[0].modalita_quotazione == 1) {
          peopleNumber = 1;
        } else if (response.data.dati[0].modalita_quotazione == 0) {
          peopleNumber = response.data.dati[0].numero_persone;
        }

        if (response.data.dati[0].ppax) {
          ppaxPlaceholder = response.data.dati[0].ppax;
        }
        this.date = response.data.dati[0].data_servizio;
        console.log("details", response);
      });

    eventBus.$on("remove-item", newitem => {
      this.instances.forEach(instance => {
        if (instance.type === "Two-Level") {
          instance.categories.forEach(category => {
            category.subcatsList.forEach(subCategory => {
              subCategory.items.forEach(item => {
                if (item.id === newitem.id) {
                  item.show = false;
                  item.qty = newitem.qty;
                  this.updateData("-", newitem);
                }
              });
            });
          });
        }
      });
    });

    eventBus.$on("update-item", newitem => {
      this.instances.forEach(instance => {
        if (instance.type === "Two-Level") {
          instance.categories.forEach(category => {
            category.subcatsList.forEach(subCategory => {
              subCategory.items.forEach(item => {
                if (item.id === newitem.id) {
                  item.show = false;
                  item.qty = newitem.qty;
                  this.updateData("-", newitem);
                }
              });
            });
          });
        }
      });
    });
  },
  watch: {
    totalAll(newValue, oldValue) {
      this.totalAllCache = this.totalAll;
      axios
        .get(
          `https://${host}/fl_api/v2.0/?update_quote&token=1&menuId=${menuId}&totale_prodotto=${this.totalAll}`
        )
        .then(response => {
          // handle success
          if (response) {
            console.log("Total updated");
          }
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    }
  }
});

// INSTANCE COMPONENT
Vue.component("instance", {
  props: ["instance", "currency", "staff", "displayTotal"],
  template: `
		<div class="card instance">
			<header class="card-header has-background-brown">
				<h2 class="card-header-title has-text-white is-uppercase">
					{{ instance.name }}
				</h2>
				<p  class="card-header-title is-block has-text-white has-text-right is-uppercase">
					<span v-show="showTotal">${$total}: {{ total.toFixed(2) }} {{ currency }}</span>
				</p>
			</header>
			<div class="card-content">
				<div v-if="loading" class="loading-icon-container">
					<i class="fas fa-spinner fa-spin icon is-large"></i>
				</div>

				<div v-show="currentCategory !== ''" class="category-picker tabs">
					<ul>
						<li v-for="category in instance.categories" :class="{'is-active':currentCategory.cat_name === category.cat_name}" @click="selectedCategory(category)"><a>{{ category.cat_name }}</a></li>
					</ul>
				</div>
				
				<category 
					v-for="category in instance.categories" 
					v-show="currentCategory.cat_name === category.cat_name" 
					:currency="currency" 
					:category.sync="category" 
					@category-update="updateTotal" 
					:staff="staff" 
					:instance="instance" 
					:key="currentCategory.id"
				></category>

			</div>
		</div>
	`,
  data() {
    return {
      currentCategory: "",
      loading: true,
      totalCategories: [],
      total: 0
    };
  },
  methods: {
    selectedCategory(category) {
      if (this.currentCategory.id !== category.cat_id) {
        this.currentCategory = category;
      }
    },
    updateTotal(categoryData) {
      this.total = 0;
      const index = this.totalCategories.findIndex(element => {
        return element.id === categoryData.id;
      });

      if (index !== -1) {
        this.totalCategories.splice(index, 1, categoryData);
      } else {
        this.totalCategories.push(categoryData);
      }
      this.totalCategories.forEach(categoryTotal => {
        this.total += categoryTotal.total;
      });

      const instanceData = {
        id: this.instance.id,
        total: this.total
      };
      // this.instance.total = this.total;
      this.$emit("total-update", instanceData);
    }
  },
  computed: {
    showTotal() {
      if (location.hostname == "intavola.condivision.cloud") {
        return false
      }
      return true
    },
    showDetails() {
      if (this.displayTotal == null) {
        return true
      }

      if (this.displayTotal == '0') {
        return false
      }

      return true;
    },
  },
  mounted() {
    eventBus.$on("print-pdf", (instances, pdf) => {
      const printEl = document.getElementById("print-here");
      printEl.innerHTML = "";
      console.log("eventbus worked");
      let instanceContainer = document.createElement("div");
    });
  },
  updated() {
    if (this.currentCategory === "") {
      this.currentCategory = this.instance.categories[0];
      this.loading = !this.loading;
    }
  }
});

// CATEGORY COMPONENT
Vue.component("category", {
  props: ["category", "currency", "instance"],
  template: `
		<div class="content">
			<sub-category 
				v-for="subCategory in category.subcatsList" 
				:catMinVal="category.cat_minVal" 
				:subCategory="subCategory" 
				:currency="currency" 
				@subcategory-update="updateTotal" 
        :staff="staff"
				:instance="instance" 
				:key="subCategory.subcat_id"
			></sub-category>
		</div>
	`,
  data() {
    return {
      totalSubCategories: [],
      total: 0,
      staff: false
    };
  },
  methods: {
    updateTotal(subCategoryData) {
      this.total = 0;
      let index = this.totalSubCategories.findIndex(element => {
        return element.id === subCategoryData.id;
      });

      if (index !== -1) {
        this.totalSubCategories.splice(index, 1, subCategoryData);
      } else {
        this.totalSubCategories.push(subCategoryData);
      }
      this.totalSubCategories.forEach(subCategoryTotal => {
        this.total += subCategoryTotal.total;
      });

      const categoryTotal = {
        id: this.category.cat_id,
        total: this.total
      };

      this.$emit("category-update", categoryTotal);
    }
  },
  mounted() {
    if (this.category.cat_name === "Staff") {
      this.staff = true;
    }
  }
});

// SUB-CATEGORY COMPONENT
Vue.component("sub-category", {
  props: ["subCategory", "currency", "catMinVal", "staff", "instance"],
  template: `
		<article class="card category">
      <header class="card-header">
      <div style="display: flex;
      justify-content: center;
      align-items: center;
      width: 2em;
      font-size: 1.5em;">
        <div v-if="!('subcat_limit' in subCategory) || Number(subCategory.subcat_limit) > 0" class="has-text-success" style="cursor: pointer" @click="showModal = true">
          <i class="fas fa-plus-circle"></i>
        </div>
      </div>
				<div class="card-header-title" @click="showCategoryContent">
					<p>
						{{ subCategory.subcat_name }}
					</p>
					<p :class="{ 'hide-for-client': showDetails }">
						{{ total.toFixed(2) }} {{ currency }}
					</p>
				</div>
			</header>
			<transition name="fade">
				<keep-alive>
					<div class="card-content" v-if="showCategory">
						<div class="content">
							<table class="table is-responsive">
								<tr>
									<th>${$item}</th>
                  <th>
                    <span>${$quantity}</span>
                  </th>
                  <th>
                    <span>PPAX</span>
                  </th>
									<th v-if="staff">${$hours}</th>
                  <th>
                    <span :class="{ 'hide-for-client': showDetails }">${$price}</span>
                  </th>
									<th>${$option}</th>
                  <th>
                    <span :class="{ 'hide-for-client': showDetails }">${$total}</span>
                  </th>
									<th></th>
								</tr>
								<tr v-if="addedItems.length === 0">
									<td>${$noAdded}</td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
									<td></td>
								</tr>
								<tr 
									is="added-item" 
									v-else 
									v-for="addedItem in addedItems" 
									@item-update="updateItem" 
									@remove-item="removeItem" 
									:quiverCode="subCategory.quiverCode" 
									:addedItem.sync="addedItem" 
									:currency="currency" 
									:staff="staff" 
									:key="addedItem.id"
								></tr>
							</table>
						</div>
					</div>
				</keep-alive>
			</transition>
			<footer class="card-footer">
				<keep-alive>
					<transition name="fade" v-if="showModal">
						<div class="modal is-active">
							<div class="modal-background"></div>
								<div class="modal-card" style="width:90% !important; max-width: 90% !important;">
									<header class="modal-card-head">
										<p class="modal-card-title">{{ subCategory.subcat_name}}</p>
										<button @click="closeModal" class="delete" aria-label="close"></button>
									</header>
									<section class="modal-card-body">
										<div class="level">
											<div class="level-left" style="flex-direction: column; ">
                        <p style="margin-bottom: 0; padding-left: 10px;">${$totalItems}: {{filtereditems.length}}</p>
                        <p v-if="subCategory.subcat_limit > 0" style="color:red">Max {{ subCategory.subcat_limit }} scelte</p>
											</div>
											<div class="control level-right has-icons-right">
												<input class="input" placeholder="${$search}" v-model="search">
												<span class="icon is-small is-right">
													<i class="fas fa-search"></i>
												</span>
											</div>
										</div>

										<table class="table is-responsive" >
                      <tr>
												<th style="width: 40%;">${$item}</th>
                        <th class="small">
                          <span :class="{ 'hide-for-client': showDetails }">${$price}</span>
                        </th>
                        <th class="small">
                          <span>${$quantity}</span>
                        </th>
                        <th class="small">
                          <span>PPAX</span>
                        </th>
                        <th class="is-three-quarters">Note</th>
												<th v-if="staff" class="small">${$hours}</th>
												<th></th>
											</tr>

											<tr 
												is="item-list" 
												v-for="item in filtereditems" 
												@add-item="addItem" 
												:quiverCode="subCategory.quiverCode" 
												:item.sync="item" 
												:currency="currency" 
												:catMinVal="catMinVal" 
                        :staff="staff"
                        :instance="instance.name"
                        :isInLimit="isInLimit"
                        :limit="subCategory.subcat_limit"
												:key="item.id"
											></tr>

										</table>
									</section>
									<footer class="modal-card-foot">

									</footer>
								</div>
							</div>
						</div>

					</transition>
				</keep-alive>
			</footer>
		</article >
	`,
  data() {
    return {
      displayDetails: displayDetails,
      showModal: false,
      showCategory: false,
      search: "",
      addedItems: [],
      total: 0
    };
  },
  computed: {
    showDetails() {
      if (Number(this.displayDetails) == 0) {
        return true
      }
      return false;
    },
    filtereditems() {
      if (this.search == "") {
        return this.subCategory.items;
      }
      let items = [];
      items = this.subCategory.items.filter(item => {
        const search = String(this.search).toLowerCase();
        if (
          item.codice_articolo &&
          item.codice_articolo.toLowerCase().includes(search)
        ) {
          return item;
        } else if (item.tags && item.tags.toLowerCase().includes(search)) {
          return item;
        } else if (
          item.descrizione &&
          item.descrizione.toLowerCase().includes(search)
        ) {
          return item;
        }
      });
      return items;
    },
    isInLimit() {
      if (this.instance.name == $food && Number(this.subCategory.subcat_limit) != 0 && this.addedItems.length >= Number(this.subCategory.subcat_limit)) {
        return true
      }
      return false
    }
  },
  methods: {
    addItem(newItem) {
      this.total = 0;
      if (this.showCategory == false) {
        this.showCategory = true;
      }
      this.addedItems.unshift(newItem);
      console.log("newItem", newItem);
      this.addedItems.forEach(item => {
        if (item.ultimo_prezzo) {
          let semiTot = Number(item.qty) * Number(item.ultimo_prezzo);

          if (item.moltiplicatore) {
            semiTot *= Number(item.moltiplicatore);
          } else if (item.moltiplicatore) {
            semiTot *= Number(item.moltiplicatore);
          }
          this.total += Number(semiTot);
        } else if (item.valore && item.qty) {
          console.log("item", item.moltiplicatore);
          let semiTot = Number(item.qty) * Number(item.valore);

          if (item.moltiplicatore) {
            semiTot *= Number(item.moltiplicatore);
          } else if (item.moltiplicatore) {
            semiTot *= Number(item.moltiplicatore);
          }
          this.total += Number(semiTot);
        }
      });

      const subCategoryData = {
        id: this.subCategory.subcat_id,
        total: this.total
      };
      this.$emit("subcategory-update", subCategoryData);
    },
    updateItem(updatedItem) {
      console.log("updatedItem", updatedItem);
      this.total = 0;

      // if (updatedItem.discount) {
      // 	let index = this.addedItems.findIndex( item => {
      // 		return item.id === updatedItem.id;
      // 	});
      // 	this.addedItems[index].valore -= Number(updatedItem.valore) * Number(updatedItem.discount);
      // 	// if (item.moltiplicatore) {
      // 	// 	this.total *= Number(item.moltiplicatore);
      // 	// }
      // }
      if (this.addedItems) {
        this.addedItems.forEach(item => {
          if (item.id == updatedItem.id) {
            item.moltiplicatore = updatedItem.moltiplicatore;
            item.qty = updatedItem.qty;
            item.ppax = updatedItem.ppax;
            if (item.valore) {
              item.valore = updatedItem.valore;
            } else {
              item.ultimo_prezzo = updatedItem.valore;
            }
          }

          let semiTot;

          if (item.ultimo_prezzo) {
            semiTot = Number(item.qty) * Number(item.ultimo_prezzo);

            if (item.moltiplicatore) {
              semiTot *= Number(item.moltiplicatore);
            } else if (item.moltiplicatore) {
              semiTot *= Number(item.moltiplicatore);
            }

            this.total += Number(semiTot);
          } else if (item.valore && item.qty) {
            semiTot = Number(item.qty) * Number(item.valore);

            if (item.moltiplicatore) {
              semiTot *= Number(item.moltiplicatore);
            } else if (item.moltiplicatore) {
              semiTot *= Number(item.moltiplicatore);
            }

            this.total += Number(semiTot);
          }
        });
      }

      const subCategoryData = {
        id: this.subCategory.subcat_id,
        total: this.total
      };
      this.$emit("subcategory-update", subCategoryData);
    },
    removeItem(itemToRemove) {
      this.total = 0;
      this.addedItems.filter((item, index) => {
        if (item.id === itemToRemove.id) {
          this.addedItems.splice(index, 1);
        }
      });
      this.addedItems.forEach(item => {
        if (item.valore && item.qty) {
          this.total += item.moltiplicatore
            ? Number(item.qty) *
            Number(item.valore) *
            Number(item.moltiplicatore)
            : Number(item.qty) * Number(item.valore);
        } else if (item.ultimo_prezzo) {
          this.total += item.moltiplicatore
            ? Number(item.qty) *
            Number(item.ultimo_prezzo) *
            Number(item.moltiplicatore)
            : Number(item.qty) * Number(item.ultimo_prezzo);
        }
      });

      const subCategoryData = {
        id: this.subCategory.subcat_id,
        total: this.total
      };
      this.$emit("subcategory-update", subCategoryData);
    },
    closeModal() {
      this.showModal = false;
    },
    showCategoryContent() {
      this.showCategory = !this.showCategory;
    }
  },
  mounted() {
    this.addedItems = this.subCategory.addedItems;
    // console.log('addeditems',this.addedItems)
    this.total = 0;
    if (this.addedItems.length > 0) {
      this.addedItems.forEach(item => {
        if (item.valore && item.qty) {
          this.total += item.moltiplicatore
            ? Number(item.qty) *
            Number(item.valore) *
            Number(item.moltiplicatore)
            : Number(item.qty) * Number(item.valore);
        } else if (item.ultimo_prezzo) {
          this.total += item.moltiplicatore
            ? Number(item.qty) *
            Number(item.ultimo_prezzo) *
            Number(item.moltiplicatore)
            : Number(item.qty) * Number(item.ultimo_prezzo);
        }
        item.note = item.note.replace("undefined", "");
      });
    }

    const subCategoryData = {
      id: this.subCategory.subcat_id,
      total: this.total
    };
    this.$emit("subcategory-update", subCategoryData);
    if (this.addedItems.length > 0) {
      this.showCategory = true;
    }
  }
});

// ADDED ITEM COMPONENT
Vue.component("added-item", {
  props: ["addedItem", "currency", "quiverCode", "staff"],
  template: `
		<tr>
			<td><span v-html="name"/></td>
      <td>
        <span :class="{ 'hide-for-client': showDetails }">{{ qty }}</span>
      </td>
      <td>
        <span :class="{ 'hide-for-client': showDetails }">{{ ppax }}</span>
      </td>
			<td v-if="staff">{{ moltiplicatore }}</td>
      <td>
        <span :class="{ 'hide-for-client': showDetails }">{{ valore.toFixed(2) }} {{ currency }}</span>
      </td>
			<td>{{ addedItem.note }}</td>
      <td>
        <span :class="{ 'hide-for-client': showDetails }">{{ itemTotal.toFixed(2) }} {{ currency }}</span></td>
			<td>
				<a  class="button is-fullwidth" @click="openItemModal">
					<span class="icon">
						<i class="far fa-edit"></i>
					</span>
					<span>${$modify}</span>
				</a>
			</td>
			<keep-alive>
				<item-modal 
					v-if="itemModal" 
					@item-update="updateItem" 
					@remove-item="openRemoveModal" 
					@close-item-modal="closeItemModal" 
					:loading="loading" 
					:item.sync="addedItem" 
					:staff="staff" 
					:currency="currency"
				></item-modal>
			</keep-alive>
			<transition name="fade" v-if="removeModal">
				<div class="modal is-active">
					<div class="modal-background"></div>
						<div class="modal-card">
							<header class="modal-card-head">
								<p class="modal-card-title">${$removeQ} {{ name }}?</p>
								<button @click="closeRemoveModal" class="delete" aria-label="close"></button>
							</header>
							<section class="modal-card-body columns is-mobile is-centered">
								<div class="column is-one-quarter">
									<a class="button is-success is-fullwidth" :class="{'is-loading':loading}" @click="removeItem">
										<span class="icon">
											<i class="far fa-check-circle"></i>
										</span>
										<span>${$yes}</span>
									</a>
								</div>
								<div class="column is-one-quarter">
									<a class="button is-danger is-fullwidth" @click="closeRemoveModal">
										<span class="icon">
											<i class="far fa-times-circle"></i>
										</span>
										<span>${$no}</span>
									</a>
								</div>
							</section>
							<footer class="modal-card-foot">
								
							</footer>
						</div>
					</div>
				</div>
			</transition>
		</tr>
	`,
  data() {
    return {
      displayDetails: displayDetails,
      itemCached: this.addedItem,
      itemModal: false,
      loading: false,
      removeModal: false,
      moltiplicatore: this.addedItem.moltiplicatore
        ? this.addedItem.moltiplicatore
        : this.addedItem.moltiplicatore
    };
  },
  methods: {
    updateItem(updatedItem) {
      this.moltiplicatore = updatedItem.moltiplicatore;
      var queryQty = `&qty=${updatedItem.qty}`;
      var queryPPAX = `&ppax=${updatedItem.ppax}`;
      var queryValore = `&valore=${updatedItem.valore}`;
      var queryNote = `&note=${updatedItem.note}`;

      if (updatedItem.moltiplicatore) {
        var queryHours = `&moltiplicatore=${updatedItem.moltiplicatore}`;
      } else {
        var queryHours = "";
      }

      this.loading = true;
      axios
        .get(
          `https://${host}/fl_api/v2.0/?updateSynapsy&token=1&eventoId=${eventoId}&menuId=${menuId}&quiverCode=${this.quiverCode}&recordId=${updatedItem.id}${queryQty}${queryValore}${queryNote}${queryHours}${queryPPAX}`
        )
        .then(response => {
          console.log("wtf", queryNote);
          this.updateItemCached(updatedItem);
          this.itemModal = false;
          this.$emit("item-update", updatedItem);
          this.loading = false;
          this.show = !this.show;
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    removeItem(itemId) {
      let item = {
        id: this.addedItem.id
      };
      this.loading = true;
      axios
        .get(
          `https://${host}/fl_api/v2.0/?removeSynapsy&token=1&eventoId=${eventoId}&menuId=${menuId}&quiverCode=${this.quiverCode}&recordId=${this.addedItem.id}`
        )
        .then(response => {
          console.log(response.data);
          this.loading = false;
          this.$emit("remove-item", item);
        })
        .catch(error => {
          // handle error
          console.log(error);
        });
    },
    updateItemCached(newData) {
      if (this.addedItem.qty) {
        this.addedItem.qty = newData.qty;
      }

      if (this.addedItem.valore) {
        this.addedItem.valore = newData.valore;
      } else if (this.addedItem.ultimo_prezzo) {
        this.addedItem.ultimo_prezzo = newData.valore;
      }
      console.log("newData", newData);
    },
    openItemModal() {
      this.itemModal = true;
    },
    closeItemModal() {
      this.itemModal = false;
    },
    openRemoveModal() {
      this.removeModal = true;
    },
    closeRemoveModal() {
      this.removeModal = false;
    }
  },
  computed: {
    showDetails() {
      if (Number(this.displayDetails) == 0) {
        return true
      }
      return false;
    },
    name() {
      if (this.addedItem.descrizione) {
        return decodeHTML(this.addedItem.descrizione);
      } else if (this.addedItem.name) {
        return decodeHTML(this.addedItem.name);
      } else if (this.addedItem.funzione) {
        return decodeHTML(this.addedItem.funzione);
      }
    },
    qty() {
      if (this.addedItem.qty) {
        return this.addedItem.qty;
      }
    },
    ppax() {
      if (this.addedItem.ppax) {
        return Number(this.addedItem.ppax);
      }
    },
    valore() {
      if (this.addedItem.valore) {
        return Number(this.addedItem.valore);
      } else if (this.addedItem.ultimo_prezzo) {
        return Number(this.addedItem.ultimo_prezzo);
      }
      return Number(0.0);
    },
    note() {
      if (this.addedItem.note != "undefined") {
        return this.addedItem.note;
      } else if (this.addedItem.note.includes("undefined")) {
        let note = this.addedItem.note;
        console.log(note);
        return note.replace("undefined", "");
      }
    },
    itemTotal() {
      let total = 0;
      total = Number(this.addedItem.qty * this.addedItem.valore);

      if (this.addedItem.ultimo_prezzo) {
        total = 0;
        total = Number(this.addedItem.qty * this.addedItem.ultimo_prezzo);

        if (this.staff) {
          total *= Number(this.moltiplicatore);
        }
        if (this.addedItem.discount) {
          total -= Number(total) * Number(this.addedItem.discount);
        }
      } else {
        total = Number(this.addedItem.qty * this.addedItem.valore);
        if (this.staff) {
          total *= Number(this.moltiplicatore);
        }
        if (this.addedItem.discount) {
          total -= Number(total) * Number(this.addedItem.discount);
        }
      }
      return total;
    }
  }
});

Vue.component("item-modal", {
  props: ["item", "currency", "loading", "staff"],
  template: `
		<transition name="fade">
			<div class="modal is-active">
				<div class="modal-background"></div>
					<div class="modal-card">
						<header class="modal-card-head">
							<p class="modal-card-title" style="width: 80%">{{ name }}</p>
							<button @click="closeItemModal" class="delete" aria-label="close"></button>
						</header>
						<section class="modal-card-body columns is-mobile is-centered">
							<div class="column is-one-fifth">
								<label class="label" for="qty">${$quantity}</label>
								<input class="input" name="qty" v-model.number="item.qty" @change="dataChanged" :placeholder="this.qtyPlaceholder">
              </div>
              <div class="column is-one-fifth">
								<label class="label" for="ppax">PPAX</label>
								<input class="input" name="ppax" v-model.number="item.ppax">
							</div>
							<div v-if="staff" class="column is-one-fifth">
								<label class="label" for="hours">${$hours}</label>
								<input class="input" name="hours" v-model.number="moltiplicatore" @change="dataChanged" :placeholder="this.qtyPlaceholder">
							</div>
							<div class="column is-one-fifth" :class="{ 'hide-for-client': showDetails }">
								<label class="label" for="valore">${$price}</label>
								<div class="control has-icons-right">
									<input class="input" name="valore" v-model.number="item.valore" @change="dataChanged" :placeholder="this.pricePlaceholder">
									<span class="icon is-small is-right">
										{{ currency }}
									</span>
								</div>
								
							</div>
							<div v-if="false" class="column is-one-fifth">
								<label class="label" for="discount">${$discount}</label>
								<div class="select is-fullwidth" name="discount">
									<select v-model="selected" @change="selectedChanged">
										<option :value="null">${$none}</option>
										<option v-for="discount in discounts" :value="discount.value">{{ discount.option }}</option>
									</select>
								</div>
							</div>
							<div class="column">
								<label class="label" for="option">${$option}</label>
								<input class="input" name="option" v-model="item.note">
							</div>
						</section>
						<footer class="modal-card-foot columns">
							<div class="column is-one-quarter">
								<a class="button is-success is-fullwidth" :class="{'is-loading':loading}" @click="updateItem">
									<span class="icon">
										<i class="far fa-save"></i>
									</span>
									<span>${$save}</span>
								</a>
							</div>
							<div class="column is-one-quarter">
								<a class="button is-danger is-fullwidth" @click="openRemoveModal">
									<span class="icon">
										<i class="far fa-trash-alt"></i>
									</span>
									<span>${$remove}</span>
								</a>
							</div>
							<div class="column" :class="{ 'hide-for-client': showDetails }">
								<p class="modal-card-title has-text-centered">${$total}: {{ totalPrice.toFixed(2) }}{{ currency }}</p>
							</div>
						</footer>
					</div>
				</div>
			</div>
		</transition>
	`,
  data() {
    return {
      displayDetails: displayDetails,
      pricePlaceholder: this.item.valore
        ? this.item.valore
        : this.item.ultimo_prezzo,
      qtyPlaceholder: this.item.qty,
      moltiplicatore: this.item.moltiplicatore
        ? this.item.moltiplicatore
        : this.item.moltiplicatore,
      discounts: [
        {
          value: 0.05,
          option: "5%"
        },
        {
          value: 0.1,
          option: "10%"
        },
        {
          value: 0.2,
          option: "20%"
        }
      ],
      selected: null,
      totalPrice: 0
    };
  },
  methods: {
    updateItem() {
      let updatedItem = {
        id: this.item.id,
        name: this.item.descrizione,
        qty: Number(this.item.qty),
        ppax: Number(this.item.ppax),
        valore: Number(this.item.valore),
        show: this.item.show,
        moltiplicatore: Number(this.moltiplicatore),
        discount: Number(this.selected),
        note: this.item.note
      };
      console.log("updatedItem", updatedItem);
      this.$emit("item-update", updatedItem);
    },
    openRemoveModal() {
      let itemId = this.item.id;
      this.$emit("remove-item", itemId);
    },
    closeItemModal() {
      this.$emit("close-item-modal");
    },
    selectedChanged(event) {
      if (event.target.value !== "") {
        this.totalPrice = Number(this.item.valore) * Number(this.item.qty);
        this.totalPrice =
          Number(this.totalPrice) -
          Number(this.totalPrice) * Number(event.target.value);
      } else {
        this.totalPrice = Number(this.item.valore) * Number(this.item.qty);
      }
      if (this.staff) {
        this.totalPrice *= Number(this.moltiplicatore);
      }
    },
    dataChanged() {
      this.totalPrice = 0;
      if (this.selected) {
        this.totalPrice = Number(this.item.valore) * Number(this.item.qty);
        this.totalPrice =
          Number(this.totalPrice) -
          Number(this.totalPrice) * Number(this.selected);
      } else {
        this.totalPrice = Number(this.item.valore) * Number(this.item.qty);
      }
      if (this.staff) {
        this.totalPrice *= Number(this.moltiplicatore);
      }
    },
    hoursChanged() {
      if (this.selected) {
        this.totalPrice = this.item.valore * this.item.qty;
        this.totalPrice =
          this.item.totalPrice - this.totalPrice * this.selected;
      } else {
        this.totalPrice = this.item.valore * this.item.qty;
      }
      if (this.staff) {
        this.totalPrice *= Number(this.moltiplicatore);
      }
    }
  },
  computed: {
    showDetails() {
      if (Number(this.displayDetails) == 0) {
        return true
      }
      return false;
    },
    name() {
      if (this.item.descrizione) {
        return decodeHTML(this.item.descrizione);
      }

      if (this.item.name) {
        return decodeHTML(this.item.name);
      }
    }
  },
  mounted() {
    if (this.selected) {
      this.totalPrice = Number(this.item.valore * this.item.qty);
      this.totalPrice = Number(
        this.totalPrice - this.totalPrice * this.selected
      );
    } else {
      this.totalPrice = Number(this.item.valore * this.item.qty);
    }

    if (this.staff) {
      this.totalPrice *= Number(this.moltiplicatore);
    }
  }
});

// item LIST ITEM COMPONENT
Vue.component("item-list", {
  props: ["item", "currency", "catMinVal", "quiverCode", "staff", "instance", "isInLimit", 'limit'],
  template: `
    <tr>
      <td>
        <div style="display:flex">
          
          <div>
            <span v-html="name"/>
            <br>

            <div style="display:flex">
              <div style="padding-right: .5rem; width:24px;">
                <template v-if="item.image">
                  <a @click="modal = true">
                    <i style="font-size: 18px; cursor: pointer; color:lightgray;"  class="fas fa-camera"></i>
                  </a>
                  <div class="modal" :class="{'is-active': modal}">
                    <div @click="modal = false" class="modal-background"></div>
                    <div class="modal-content">
                      <p class="image is-4by3">
                        <img :src="item.image" alt="">
                      </p>
                    </div>
                    <button @click="modal = false" class="modal-close is-large" aria-label="close"></button>
                  </div>
                </template>
              </div>
              <span v-if="item.codice_articolo" class="tag is-info">
                {{ item.codice_articolo }}
              </span>
              <span v-if="item.tags" style="margin-right:0.4em;" v-for="tag in tags"  class="tag is-primary" :key="tag">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </td>
			<td class="small">
				<div class="control has-icons-right" :class="{ 'hide-for-client': showDetails }">
					<input class="input" v-model.number="cacheValore" step="0.01" min="0">
					<span class="icon is-small is-right">
						{{ currency }}
					</span>
				</div>
			</td>
      <td class="small"><input class="input" :class="{ 'hide-for-client': showDetails }" v-model.number="cacheQuantity" step="0.01" min="0"></td>
      <td class="small"><input class="input" :class="{ 'hide-for-client': showDetails }" v-model.number="ppax" step="0.01" min="0"></td>
      <td><input class="input" v-model="note"></td>
			<td v-if="staff" class="small"><input class="input" v-model.number="moltiplicatore"></td>
			<td>
        <a class="button is-fullwidth" :class="{'corange':!added, 'has-text-white-bis':!added,'is-success':added,'is-loading':loading}" @click="additem">
					<span class="icon" v-if="addedItem">
						<i class="fas fa-plus-circle"></i>
					</span>
					<span>{{ addMessage }}</span>
				</a>
			</td>
		</tr>
	`,
  data() {
    return {
      displayDetails: displayDetails,
      modal: false,
      added: false,
      cacheValore: this.valoreFixed(),
      cacheQuantity: 1,
      ppax: ppaxPlaceholder ? ppaxPlaceholder.toFixed(2) : 0.0,
      loading: false,
      addMessage: $add,
      addedItem: true,
      note: "",
      moltiplicatore: 0,
      tags: this.tagsSplitted()
    };
  },
  methods: {
    tagsSplitted() {
      if (this.item.tags) {
        let tagsArr = this.item.tags.split(",");
        tagsArr.forEach((tag, index) => {
          let element = tag;
          element = element.replace("{", "");
          element = element.replace("}", "");
          tagsArr[index] = element;
        });

        return tagsArr;
      } else {
        return [];
      }
    },
    valoreFixed() {
      if (Number(this.item.valore)) {
        return Number(this.item.valore).toFixed(2);
      }

      if (Number(this.item.ultimo_prezzo)) {
        return Number(this.item.ultimo_prezzo).toFixed(2);
      }

      if (Number(this.item.food_cost)) {
        return Number(this.item.food_cost).toFixed(2);
      }

      if (Number(this.item.prezzo_vendita)) {
        return Number(this.item.prezzo_vendita).toFixed(2);
      }
      return 0.0;
    },
    additem() {
      if (this.isInLimit) {
        alert(`Puoi scegliere ${this.limit} elementi.`);
        return;
      }
      if (addingItem) {
        return;
      }
      addingItem = true;
      this.loading = true;
      this.addedItem = false;

      var form = new FormData();
      form.append('token', 1)
      form.append('eventoId', eventoId)
      form.append('quiverCode', this.quiverCode)
      form.append('arrowId', this.item.id)
      form.append('descrizione', this.name)
      form.append('qty', this.cacheQuantity)
      form.append('valore', this.cacheValore)
      form.append('note', this.note)
      form.append('moltiplicatore', this.moltiplicatore)
      form.append('ppax', this.ppax)

      axios
        .post(
          `https://${host}/fl_api/v4.0/?createSynapsy&token=1`, form
        )
        .then(response => {
          addingItem = false;

          console.log("add response", response);
          let item = {
            id: response.data.dati,
            name: this.name,
            qty: Number(this.cacheQuantity).toFixed(2),
            ppax: Number(this.ppax).toFixed(2),
            valore: Number(this.cacheValore).toFixed(2),
            show: this.item.show,
            moltiplicatore: Number(this.moltiplicatore),
            note: this.note
          };
          // this.cacheQuantity = peopleNumber;
          this.note = "";

          console.log(item);

          this.loading = false;
          eventBus.$emit("add-item", item);
          this.$emit("add-item", item);

          this.addMessage = $added;
          this.addedItem = true;
          this.added = true;
          // setTimeout(() => {
          //   // this.addMessage = $add
          // }, 2000);
        })
        .catch(error => {
          // handle error
          addingItem = false;
          this.loading = false;
          console.log(error);
        });
      // this.cacheValore = this.item.valore ? this.item.valore: 0.00;
      // this.cacheQuantity = 1;
    }
  },
  computed: {
    showDetails() {
      if (Number(this.displayDetails) == 0) {
        return true
      }
      return false;
    },
    showImage() {
      if (this.instance == $food || this.instance == $beverage) {
        return true;
      }
      return false;
    },
    name() {
      if (this.item.descrizione) {
        return this.item.descrizione;
      } else if (this.item.name) {
        return this.item.name;
      } else if (this.item.funzione) {
        return this.item.funzione;
      }
    },
    valore() {
      if (this.item.valore) {
        return Number(this.item.valore);
      } else if (this.item.ultimo_prezzo) {
        return Number(this.item.ultimo_prezzo);
      }
      // return Number(0);
    }
  },
  created() {
    if (peopleNumber !== null) {
      this.cacheQuantity = peopleNumber;
    }
  }
});

if (menuId !== null) {
  // VIEW MAIN
  let vm = new Vue({
    el: "#app"
  });
} else {
  alert("menuId is required!");
}
